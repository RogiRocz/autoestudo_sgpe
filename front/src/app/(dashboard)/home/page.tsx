'use client'

import { ListSessions } from '@/components/shared/ListSessions'
import { LogoutButton } from '@/components/shared/LogoutButton'
import { MenuBar } from '@/components/shared/MenuBar'
import { Container } from '@/components/ui/grid'
import { useProntuarios } from '@/hooks/queries/useProntuario.hook'
import { prontuariosStore } from '@/store/prontuario.store'
import { useEffect } from 'react'

export default function HomePage() {
    const { data: prontuarios } = useProntuarios()
    const { setProntuarios } = prontuariosStore()

    
    useEffect(() => {
        if (prontuarios?.data) {
            setProntuarios(prontuarios.data)
        }
    }, [prontuarios, setProntuarios])
    
    

    return (
        <Container className="px-0">
            <ListSessions />
        </Container>
    )
}
