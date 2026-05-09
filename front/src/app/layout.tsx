import { Geist, Geist_Mono, Raleway, Montserrat } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import QueryProvider from '@/providers/query.provider'
import { Toaster } from 'sonner'
import { Container } from '@/components/ui/grid'

const montserratHeading = Montserrat({
    subsets: ['latin'],
    variable: '--font-heading',
})

const raleway = Raleway({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="pt_br"
            suppressHydrationWarning
            className={cn(
                'antialiased',
                fontMono.variable,
                'font-sans',
                raleway.variable,
                montserratHeading.variable
            )}
        >
            <body>
                <QueryProvider>
                    <ThemeProvider>
                        <Container className="px-0"> 
                            <main>{children}</main>
                        </Container>
                    </ThemeProvider>
                </QueryProvider>
                <Toaster />
            </body>
        </html>
    )
}
