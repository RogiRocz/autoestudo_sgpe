import { cn } from "@/lib/utils"

export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        !className?.includes("px-") && "px-4 sm:px-6 lg:px-8",
        !className?.includes("max-w-") && "container w-full max-w-none",
        className
      )}
    >
      {children}
    </div>
  )
}

export function Row({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("-mx-4 flex flex-wrap", className)}>{children}</div>
}

export function Col({
  children,
  cols = 12,
  md,
  lg,
  className,
}: {
  children: React.ReactNode
  cols?: number | string
  md?: number | string
  lg?: number | string
  className?: string
}) {
  const colClasses = cn(
    "w-full px-4",
    cols && `w-${cols}/12`,
    md && `md:w-${md}/12`,
    lg && `lg:w-${lg}/12`,
    className
  )

  return <div className={colClasses}>{children}</div>
}
