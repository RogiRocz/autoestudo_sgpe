'use client'

import { useAuthUser } from '@/hooks/queries/useAuthUser.hook'
import { prontuariosStore } from '@/store/prontuario.store'
import { Col, Container } from '../ui/grid'
import { CardSesison } from './CardSession'

export function ListSessions() {
    const { prontuarios } = prontuariosStore()

    return (
        <Container>
            <Col>
                {prontuarios?.map((p, i) => {
                    return (
                        <CardSesison key={i} {...p} title={`Sessão ${i + 1}`} />
                    )
                })}
            </Col>
        </Container>
    )
}
