import { cn } from '@/lib/utils'

const colVariants: Record<string | number, string> = {
    1: 'w-1/12',
    2: 'w-2/12',
    3: 'w-3/12',
    4: 'w-4/12',
    5: 'w-5/12',
    6: 'w-6/12',
    7: 'w-7/12',
    8: 'w-8/12',
    9: 'w-9/12',
    10: 'w-10/12',
    11: 'w-11/12',
    12: 'w-12/12',
}

const mdVariants: Record<string | number, string> = {
    1: 'md:w-1/12',
    2: 'md:w-2/12',
    3: 'md:w-3/12',
    4: 'md:w-4/12',
    5: 'md:w-5/12',
    6: 'md:w-6/12',
    7: 'md:w-7/12',
    8: 'md:w-8/12',
    9: 'md:w-9/12',
    10: 'md:w-10/12',
    11: 'md:w-11/12',
    12: 'md:w-12/12',
}

const lgVariants: Record<string | number, string> = {
    1: 'lg:w-1/12',
    2: 'lg:w-2/12',
    3: 'lg:w-3/12',
    4: 'lg:w-4/12',
    5: 'lg:w-5/12',
    6: 'lg:w-6/12',
    7: 'lg:w-7/12',
    8: 'lg:w-8/12',
    9: 'lg:w-9/12',
    10: 'lg:w-10/12',
    11: 'lg:w-11/12',
    12: 'lg:w-12/12',
}

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
                'mx-auto w-full',
                !className?.includes('px-') && 'px-4 sm:px-6 lg:px-8',
                !className?.includes('max-w-') && 'container w-full max-w-none',
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
    return (
        <div className={cn('-mx-4 flex flex-wrap', className)}>{children}</div>
    )
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
        'w-full px-4',
        cols && colVariants[cols],
        md && mdVariants[md],
        lg && lgVariants[lg],
        className
    )

    return <div className={colClasses}>{children}</div>
}
