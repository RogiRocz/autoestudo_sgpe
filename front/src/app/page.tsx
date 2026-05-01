'use client'

import { LogoutButton } from '@/components/shared/LogoutButton'
import { MenuBar } from '@/components/shared/MenuBar'
import { RegisterSessions } from '@/components/shared/RegisterSessions'
import { Container, Row } from '@/components/ui/grid'

export default function Page() {
    return (
        <Container className="px-0">
            <header className="flex h-fit flex-row items-center justify-between px-4 py-4">
                <div id="menubarArea" className="justify-items-start">
                    <MenuBar />
                </div>
                <div id="logoutrArea" className="justify-self-end">
                    <LogoutButton />
                </div>
            </header>
            <main>
                <RegisterSessions />
            </main>
        </Container>
    )
}
