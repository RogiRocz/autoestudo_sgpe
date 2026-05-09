import { MenuBar } from '@/components/shared/MenuBar'
import { LogoutButton } from '@/components/shared/LogoutButton'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <header className="flex h-fit flex-row items-center justify-between px-4 py-4">
                <div id="menubarArea" className="justify-items-start">
                    <MenuBar />
                </div>
                <div id="logoutrArea" className="justify-self-end">
                    <LogoutButton />
                </div>
            </header>
            <main>{children}</main>
        </>
    )
}
