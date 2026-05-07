import * as React from "react"
export function FacebookIcon({
  size = 680,
  color = "currentColor",
  strokeWidth = 2,
  fill = "currentColor",
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number
  color?: string
  strokeWidth?: number
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 680 850"
      fill={fill}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M659 8q34 0 59 24t24 58v577q0 35-24 59t-59 24H494V461h83l23-102H494v-69q0-22 13-41t44-19h49V123h-74q-79 0-117 42t-38 110v84h-83v102h83v289H82q-34 0-58-24T0 667V90q0-34 24-58T82 8z" />
    </svg>
  )
}

export function LinkedinIcon({
  size = 680,
  color = "currentColor",
  strokeWidth = 2,
  fill = "currentColor",
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  size?: number
  color?: string
  strokeWidth?: number
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 680 850"
      fill={fill}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M165 90q0 35-21 59t-62 24q-37 0-59-24T0 95q0-35 23-61T83 8t60 24t22 58M0 750h165V214H0zm560-528q-32 0-57 8t-45 21t-33 27t-21 27h-4l-9-70H243q0 34 2 74t2 86v355h165V457q0-12 1-22t3-19q4-11 11-23t16-21t22-16t29-6q44 0 64 32t19 83v285h165V445q0-57-14-99t-38-70t-58-41t-72-13" />
    </svg>
  )
}

export default { LinkedinIcon, FacebookIcon }
