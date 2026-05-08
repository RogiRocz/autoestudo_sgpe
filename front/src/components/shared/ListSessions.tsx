'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { prontuariosStore } from '@/store/prontuario.store'
import { TIPO_USUARIO } from '@/types/enums/enums'
import { useProntuarios } from '@/hooks/queries/useProntuario.hook'
import { Col, Container, Row } from '../ui/grid'
import { CardSesison } from './CardSession'
import { PaginationBar } from './PaginationBar'
import { generateParams } from '@/utils/generateParams'

export function ListSessions() {
    const { user } = useAuthStore()
    const { setProntuarios, setMetadata } = prontuariosStore()

    const [page, setPage] = useState(1)

    const { data: prontuarios, isLoading } = useProntuarios(
        generateParams({ page })
    )

    useEffect(() => {
        if (prontuarios) {
            setProntuarios(prontuarios.data)
            setMetadata(prontuarios.metadata)
        }
    }, [prontuarios, setProntuarios, setMetadata])

    if (isLoading) return <div>Carregando sessões...</div>

    return (
        <Container>
            {prontuarios?.metadata && (
                <Row>
                    <PaginationBar
                        currentPage={page}
                        pages={prontuarios.metadata.totalPages}
                        showNumbers={true}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </Row>
            )}
            <Row>
                {prontuarios?.data?.map((p, i) => (
                    <Col
                        key={p.uuid || i}
                        cols={12}
                        md={6}
                        lg={3}
                        className="mb-8"
                    >
                        <CardSesison
                            showPacientes={user?.type === TIPO_USUARIO.ALUNO}
                            showAlunos={user?.type !== TIPO_USUARIO.ALUNO}
                            {...p}
                            title={`Sessão ${(page - 1) * 10 + (i + 1)}`}
                        />
                    </Col>
                ))}
            </Row>

            {prontuarios?.metadata && (
                <Row>
                    <PaginationBar
                        currentPage={page}
                        pages={prontuarios.metadata.totalPages}
                        showNumbers={true}
                        textPagination={true}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </Row>
            )}
        </Container>
    )
}
