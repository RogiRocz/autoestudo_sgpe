import { Geist, Geist_Mono, Raleway, Montserrat } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import QueryProvider from '@/providers/query.provider'
import { Toaster } from 'sonner'
import { MenuBar } from '@/components/shared/MenuBar'
import { LogoutButton } from '@/components/shared/LogoutButton'
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
                            <header className="flex h-fit flex-row items-center justify-between px-4 py-4">
                                <div
                                    id="menubarArea"
                                    className="justify-items-start"
                                >
                                    <MenuBar />
                                </div>
                                <div
                                    id="logoutrArea"
                                    className="justify-self-end"
                                >
                                    <LogoutButton />
                                </div>
                            </header>
                            <main>{children}</main>
                        </Container>
                    </ThemeProvider>
                </QueryProvider>
                <Toaster />
            </body>
        </html>
    )
}
