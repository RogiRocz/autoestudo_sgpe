'use client'

import { LogoutButton } from '@/components/shared/LogoutButton'
import { MenuBar } from '@/components/shared/MenuBar'
import { Container, Row } from '@/components/ui/grid'
import { useAuthStore } from '@/store/auth.store'
import { useStore } from 'zustand'

export default function Page() {
	const store = useStore(useAuthStore, state => state)
	const {user} = store
	console.log(user);
	
    return (
        <Container className="px-0">
            <header className="px-4 flex h-fit flex-row items-center justify-between py-4">
                <div id="menubarArea" className="justify-items-start">
                    <MenuBar />
                </div>
                <div id="logoutrArea" className="justify-self-end">
                    <LogoutButton />
                </div>
            </header>
            <main>
                <p>Info user: </p>
            </main>
        </Container>
    )
}
