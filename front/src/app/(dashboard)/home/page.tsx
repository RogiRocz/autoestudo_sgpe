'use client'

import { useAuthStore } from '@/store/auth.store'
import { TIPO_USUARIO } from '@/types/enums/enums'
import { Container, Row, Col } from '@/components/ui/grid'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { RegisterSessions } from '@/components/shared/RegisterSessions'
import {
    ItemGroup,
    Item,
    ItemContent,
    ItemTitle,
    ItemDescription,
} from '@/components/ui/item'
import {Event} from '@mui/icons-material'


export default function HomePage() {
    const { user } = useAuthStore()

    if (!user) return null

    const isAluno = user.type === TIPO_USUARIO.ALUNO

    return (
        <Container className="py-8">
            {/* Cabeçalho de Boas-vindas */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Olá, {user.nome.split(' ')[0]}! 👋
                </h1>
                <p className="text-muted-foreground">
                    {isAluno
                        ? 'Aqui está o resumo dos seus atendimentos e agendamentos.'
                        : 'Acompanhe seu tratamento e agende novas sessões.'}
                </p>
            </header>

            <Row>
                {/* Coluna Principal: Ação de Agendamento */}
                <Col cols={12} lg={8} className="mb-6">
                    <RegisterSessions />
                </Col>

                {/* Coluna Lateral: Informações Rápidas */}
                <Col cols={12} lg={4}>
                    <div className="space-y-6">
                        {/* Card: Próxima Sessão (Dinâmico) */}
                        <Card className="bg-primary text-primary-foreground">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Event  className="h-5 w-5" />
                                    Próxima Sessão
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">
                                        15 de Maio
                                    </p>
                                    <p className="opacity-80">
                                        Quinta-feira às 14:30
                                    </p>
                                </div>
                                <div className="mt-4 border-t border-white/20 pt-4">
                                    <p className="text-sm">
                                        {isAluno
                                            ? 'Paciente: João Silva'
                                            : 'Aluno: Ricardo Souza'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card: Resumo (Stats Adaptáveis) */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base uppercase opacity-60">
                                    Resumo
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ItemGroup className="space-y-4">
                                    <Item>
                                        <ItemContent>
                                            <ItemTitle>
                                                Total de Sessões
                                            </ItemTitle>
                                            <ItemDescription className="text-xl font-bold">
                                                {isAluno
                                                    ? '24 Atendimentos'
                                                    : '12 Consultas'}
                                            </ItemDescription>
                                        </ItemContent>
                                    </Item>

                                    {isAluno && (
                                        <Item>
                                            <ItemContent>
                                                <ItemTitle>
                                                    Pacientes Ativos
                                                </ItemTitle>
                                                <ItemDescription className="text-xl font-bold">
                                                    04 Pessoas
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                    )}

                                    <Item>
                                        <ItemContent>
                                            <ItemTitle>
                                                Status do Prontuário
                                            </ItemTitle>
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                Regularizado
                                            </span>
                                        </ItemContent>
                                    </Item>
                                </ItemGroup>
                            </CardContent>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
