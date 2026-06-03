export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "")
  if (digits.length === 10) return `+63${digits}`
  if (digits.length === 11 && digits.startsWith("0")) return `+63${digits.slice(1)}`
  if (digits.length === 12 && digits.startsWith("63")) return `+${digits}`
  if (digits.length === 13 && digits.startsWith("63")) return `+${digits}`
  return raw
}
