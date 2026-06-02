"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import { format } from "date-fns"
import {
  Mail,
  Paperclip,
  Send,
  Download,
  RefreshCw,
  InboxIcon,
  ChevronLeft,
  Search,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────

type Attachment = {
  id: string
  filename: string
  content_type: string
}

type EmailMetadata = {
  id: string
  from: string
  to: string[]
  subject: string
  created_at: string
  attachments: Attachment[]
}

type FullEmail = EmailMetadata & {
  html: string
  text: string
}

const STORAGE_KEY = "cs-inbox-read"
const PAGE_SIZE = 50
const POLL_INTERVAL = 60000

// ─── Helpers ─────────────────────────────────────────

function getInitial(from: string): string {
  if (!from) return "?"
  return from.charAt(0).toUpperCase()
}

function avatarColor(sel: string) {
  const n = sel.charCodeAt(sel.length - 1) || 0
  return n % 2 === 0
    ? "bg-brand-purple/10 text-brand-purple dark:bg-purple-950/30 dark:text-purple-400"
    : "bg-brand-teal/10 text-brand-teal dark:bg-cyan-950/30 dark:text-cyan-400"
}

function emailDate(d: string) {
  const date = new Date(d)
  const now = new Date()
  const days = Math.floor((now.getTime() - date.getTime()) / 86400000)
  if (days === 0) return format(date, "h:mm a")
  if (days === 1) return "Yesterday"
  if (days < 7) return format(date, "EEEE")
  if (date.getFullYear() === now.getFullYear()) return format(date, "MMM d")
  return format(date, "MMM d, yyyy")
}

function loadReadIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return new Set<string>(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

function saveReadIds(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
  } catch { /* quota exceeded */ }
}

// ─── Component ───────────────────────────────────────

export default function InboxPage() {
  // Data
  const [emails, setEmails] = useState<EmailMetadata[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [nextCursor, setNextCursor] = useState<string | null>(null)

  // Loading
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  // Search
  const [searchQuery, setSearchQuery] = useState("")

  // Read status
  const [readIds, setReadIds] = useState<Set<string>>(loadReadIds)

  // Selected email / detail
  const [selectedEmail, setSelectedEmail] = useState<FullEmail | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  // Reply
  const [replyText, setReplyText] = useState("")
  const [sending, setSending] = useState(false)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  // Refs
  const isMounted = useRef(true)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // ── Fetch helpers ──────────────────────────────

  async function fetchWithTimeout(url: string) {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json()
    } finally {
      clearTimeout(id)
    }
  }

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || !nextCursor || searchQuery.trim()) return
    setLoadingMore(true)
    try {
      const params = new URLSearchParams()
      params.set("limit", String(PAGE_SIZE))
      params.set("after", nextCursor)
      const { emails: newEmails, hasMore: more, nextCursor: cursor } = await fetchWithTimeout(`/api/inbox/list?${params}`)
      if (!isMounted.current) return
      setEmails((prev) => [...prev, ...newEmails])
      setHasMore(more)
      setNextCursor(cursor)
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") console.error(e)
    } finally {
      if (isMounted.current) setLoadingMore(false)
    }
  }, [hasMore, loadingMore, nextCursor, searchQuery])

  const refresh = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      params.set("limit", String(PAGE_SIZE))
      params.set("skip", "9")
      const { emails: list, hasMore: more, nextCursor: cursor } = await fetchWithTimeout(`/api/inbox/list?${params}`)
      if (!isMounted.current) return
      setEmails(list)
      setHasMore(more)
      setNextCursor(cursor)
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") console.error(e)
    }
  }, [])

  // ── Events ────────────────────────────────────────

  const markRead = useCallback((id: string) => {
    setReadIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      saveReadIds(next)
      return next
    })
  }, [])

  const openEmail = useCallback(async (id: string) => {
    markRead(id)
    setLoadingDetail(true)
    try {
      const res = await fetch(`/api/inbox/${id}`)
      if (!res.ok) throw new Error()
      const full = await res.json()
      if (!isMounted.current) return
      setSelectedEmail(full)
      setReplyText("")
    } catch {
      toast.error("Failed to load email")
    } finally {
      if (isMounted.current) setLoadingDetail(false)
    }
  }, [markRead])

  const handleDownload = useCallback(async (emailId: string, attId: string, name: string) => {
    setDownloadingId(attId)
    try {
      const res = await fetch(`/api/inbox/attachment?emailId=${emailId}&attachmentId=${attId}`)
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url; a.download = name
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error("Download failed")
    } finally {
      if (isMounted.current) setDownloadingId(null)
    }
  }, [])

  const handleReply = useCallback(async () => {
    if (!selectedEmail || !replyText.trim()) return
    setSending(true)
    try {
      const res = await fetch("/api/inbox/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalMessageId: selectedEmail.id,
          to: selectedEmail.from,
          subject: selectedEmail.subject,
          replyHtml: `<p>${replyText.replace(/\n/g, "<br/>")}</p>`,
        }),
      })
      if (res.ok) {
        toast.success("Reply sent!")
        setReplyText("")
        setSelectedEmail(null)
      } else {
        toast.error("Failed to send reply")
      }
    } catch {
      toast.error("Error sending reply")
    } finally {
      setSending(false)
    }
  }, [selectedEmail, replyText])

  // ── Effects ───────────────────────────────────────

  // Initial load
  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), 15000)
    const params = new URLSearchParams()
    params.set("limit", String(PAGE_SIZE))
    params.set("skip", "9")

    fetch(`/api/inbox/list?${params}`, { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(({ emails, hasMore, nextCursor }) => {
        if (cancelled) return
        setEmails(emails)
        setHasMore(hasMore)
        setNextCursor(nextCursor)
      })
      .catch(e => { if (e.name !== "AbortError") console.error(e) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true; clearTimeout(id); controller.abort() }
  }, [])

  // Polling
  useEffect(() => {
    const interval = setInterval(refresh, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [refresh])

  // Infinite scroll
  useEffect(() => {
    const el = sentinelRef.current
    if (!el || !hasMore || loadingMore || searchQuery.trim()) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: "400px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [hasMore, loadingMore, searchQuery, loadMore])

  // Filtered list
  const displayEmails = useMemo(() => {
    if (!searchQuery.trim()) return emails
    const q = searchQuery.toLowerCase()
    return emails.filter(
      (e) =>
        e.from.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q),
    )
  }, [emails, searchQuery])

  // ── List Panel Content (shared between desktop + mobile) ──

  function renderListPanel() {
    return (
      <>
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h1 className="flex items-center gap-2 text-lg font-bold">
              <Mail className="size-5 text-brand-purple" />
              Inbox
            </h1>
            <p className="text-xs text-muted-foreground">
              {emails.length} email{emails.length !== 1 ? "s" : ""}
              {unreadCount > 0 && (
                <span className="ml-1.5 text-brand-purple">
                  · {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          <Button
            onClick={refresh}
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            title="Refresh"
          >
            <RefreshCw className="size-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="border-b p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search sender or subject…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 rounded-lg pl-9 text-sm"
            />
          </div>
        </div>

        {/* Email list */}
        <div ref={listRef} className="flex-1 space-y-0.5 overflow-y-auto p-2">
          {displayEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-brand-purple/10 dark:bg-purple-950/30">
                <InboxIcon className="size-6 text-brand-purple dark:text-purple-400" />
              </div>
              <p className="text-sm font-semibold">
                {searchQuery ? "No results found" : "No emails yet"}
              </p>
              <p className="mt-1 max-w-56 text-xs text-muted-foreground">
                {searchQuery
                  ? "Try a different search term."
                  : "Emails from website inquiries will appear here."}
              </p>
            </div>
          ) : (
            <>
              {displayEmails.map((email) => {
                const unread = !readIds.has(email.id)
                const hasAttachments =
                  email.attachments && email.attachments.length > 0
                return (
                  <div
                    key={email.id}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150",
                      unread
                        ? "bg-brand-purple/[0.02] hover:bg-brand-purple/5"
                        : "hover:bg-muted/50",
                      selectedEmail?.id === email.id && "bg-brand-purple/10",
                    )}
                    onClick={() => openEmail(email.id)}
                  >
                    {/* Unread dot */}
                    {unread && (
                      <div className="absolute left-0 top-1/2 size-2 -translate-y-1/2 -translate-x-1 rounded-full bg-brand-purple ring-2 ring-background" />
                    )}
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback
                        className={cn("text-[10px] font-semibold", avatarColor(email.id))}
                      >
                        {getInitial(email.from)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={cn(
                            "truncate text-sm",
                            unread ? "font-semibold text-foreground" : "text-foreground",
                          )}
                        >
                          {email.from}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">·</span>
                        <span
                          className={cn(
                            "truncate text-xs",
                            unread ? "font-medium text-foreground" : "text-muted-foreground",
                          )}
                        >
                          {email.subject || "(no subject)"}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2">
                        {unread && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-purple/10 px-1.5 py-0.5 text-[10px] font-medium text-brand-purple dark:bg-purple-950/30 dark:text-purple-400">
                            <span className="size-1 rounded-full bg-current" />
                            New
                          </span>
                        )}
                        {hasAttachments && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
                            <Paperclip className="size-3" />
                            {email.attachments.length}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 self-start text-[11px] text-muted-foreground">
                      {emailDate(email.created_at)}
                    </span>
                  </div>
                )
              })}

              {/* Infinite scroll sentinel */}
              <div ref={sentinelRef} className="flex justify-center py-4">
                {loadingMore && <Loader2 className="size-5 animate-spin text-brand-purple" />}
              </div>
            </>
          )}
        </div>
      </>
    )
  }

  // ── Detail Panel Content (shared between desktop + sheet) ──

  function renderDetailContent(close?: () => void) {
    if (loadingDetail) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Spinner className="size-8 text-brand-purple" />
            <p className="text-sm text-muted-foreground">Loading email…</p>
          </div>
        </div>
      )
    }

    if (!selectedEmail) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-purple/10 dark:bg-purple-950/30">
              <Mail className="size-7 text-brand-purple dark:text-purple-400" />
            </div>
            <p className="text-sm font-semibold">Select an email to read</p>
            <p className="max-w-60 text-xs text-muted-foreground">
              Choose a message from the inbox to view its contents.
            </p>
          </div>
        </div>
      )
    }

    return (
      <>
        {/* Header */}
        <div className="flex items-start gap-3 border-b p-4">
          {close && (
            <Button
              variant="ghost"
              size="icon"
              onClick={close}
              className="-ml-1 -mt-1 size-8 shrink-0"
            >
              <ChevronLeft className="size-5" />
            </Button>
          )}
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className={cn("text-xs font-semibold", avatarColor(selectedEmail.id))}>
              {getInitial(selectedEmail.from)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{selectedEmail.from}</p>
            <p className="truncate text-xs text-muted-foreground">{selectedEmail.to.join(", ")}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {new Date(selectedEmail.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pt-4">
            <h2 className="text-base font-bold">{selectedEmail.subject || "(no subject)"}</h2>
          </div>

          {/* Attachments */}
          {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
            <div className="mx-4 mt-4 rounded-lg border bg-card">
              <div className="px-3 py-2">
                <p className="mb-2 text-xs font-semibold text-muted-foreground">
                  Attachments ({selectedEmail.attachments.length})
                </p>
                <div className="space-y-1.5">
                  {selectedEmail.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="flex items-center justify-between gap-2 rounded-md border bg-muted/20 p-2 transition-colors hover:bg-muted/40"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <Paperclip className="size-3.5 shrink-0 text-muted-foreground" />
                        <span className="truncate text-sm">{att.filename}</span>
                        <span className="hidden text-xs text-muted-foreground sm:inline">({att.content_type})</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownload(selectedEmail.id, att.id, att.filename)}
                        disabled={downloadingId === att.id}
                        className="shrink-0"
                      >
                        {downloadingId === att.id ? (
                          <><Spinner className="mr-1.5 size-3" />Downloading…</>
                        ) : (
                          <><Download className="mr-1.5 size-3" />Download</>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Body */}
          <div className="px-4 py-4">
            {selectedEmail.html ? (
              <div
                className="prose prose-sm dark:prose-invert prose-headings:font-semibold prose-a:text-brand-purple prose-blockquote:border-l-brand-purple prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-pre:bg-muted prose-pre:text-foreground max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
              />
            ) : (
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {selectedEmail.text || "No content"}
              </div>
            )}
          </div>
        </div>

        {/* Reply */}
        <div className="shrink-0 border-t bg-card p-4">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">
            Reply to {selectedEmail.from}
          </p>
          <Textarea
            placeholder="Write your reply…"
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="resize-none text-sm"
          />
          <div className="mt-3 flex justify-end">
            <Button
              onClick={handleReply}
              disabled={sending || !replyText.trim()}
              className="gap-2 bg-brand-purple hover:bg-brand-purple/90"
            >
              {sending ? (
                <><Spinner className="size-4" />Sending…</>
              ) : (
                <><Send className="size-4" />Send Reply</>
              )}
            </Button>
          </div>
        </div>
      </>
    )
  }

  // ── Loading Skeleton ─────────────────────────────

  if (loading) {
    return (
      <div className="flex gap-0 rounded-xl border bg-card">
        <div className="w-full lg:w-[420px] xl:w-[480px]">
          <div className="border-b p-4">
            <Skeleton className="mb-1 h-7 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="p-3">
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
          <div className="space-y-1 px-3 pb-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg p-3">
                <Skeleton className="size-8 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <Skeleton className="h-3.5 w-32" />
                    <Skeleton className="h-3 w-10 shrink-0" />
                  </div>
                  <Skeleton className="h-3 w-52" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-center border-l lg:flex">
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="size-14 rounded-2xl" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </div>
    )
  }

  // ── Render ────────────────────────────────────────

  const unreadCount = emails.filter((e) => !readIds.has(e.id)).length

  return (
    <>
      {/* ── Desktop (lg+) — split panel ─────────── */}
      <div className="hidden lg:flex gap-0 overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex w-full flex-col lg:w-[420px] xl:w-[480px]">
          {renderListPanel()}
        </div>
        <div className="flex flex-1 flex-col border-l">
          {renderDetailContent()}
        </div>
      </div>

      {/* ── Mobile (<lg) — full-screen view swap ── */}
      <div className="lg:hidden">
        {(selectedEmail || loadingDetail) ? (
          <div className="fixed inset-0 z-40 flex flex-col bg-background">
            {renderDetailContent(() => {
              setSelectedEmail(null)
              setReplyText("")
              setLoadingDetail(false)
            })}
          </div>
        ) : (
          <div className="flex flex-col rounded-xl border bg-card shadow-sm">
            {renderListPanel()}
          </div>
        )}
      </div>
    </>
  )
}
