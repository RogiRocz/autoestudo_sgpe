'use client'

import { useAuthUser } from '@/hooks/queries/useAuthUser.hook'
import { prontuariosStore } from '@/store/prontuario.store'
import { Col, Container, Row } from '../ui/grid'
import { CardSesison } from './CardSession'
import { useAuthStore } from '@/store/auth.store'
import { TIPO_USUARIO } from '@/types/enums/enums'

export function ListSessions() {
    const { user } = useAuthStore()
    const { prontuarios } = prontuariosStore()

    return (
        <Container>
            <Row>
                {prontuarios?.map((p, i) => {
                    console.log(p)
                    return (
                        <Col key={i} cols={12} md={4} lg={3} className="mb-2">
                            <CardSesison
                                showPacientes={
                                    user?.type === TIPO_USUARIO.ALUNO
                                }
                                showAlunos={user?.type !== TIPO_USUARIO.ALUNO}
                                {...p}
                                title={`Sessão ${i + 1}`}
                            />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}
