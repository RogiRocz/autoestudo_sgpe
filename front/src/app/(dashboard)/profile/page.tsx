'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { TIPO_USUARIO } from '@/types/enums/enums'
import { Aluno } from '@/types/aluno/aluno.interface'
import { Paciente } from '@/types/paciente/paciente.interface'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    ItemGroup,
    Item,
    ItemContent,
    ItemTitle,
    ItemDescription,
} from '@/components/ui/item'
import { Col, Row, Container } from '@/components/ui/grid'

export default function ProfilePage() {
    const { user } = useAuthStore()

    if (!user || !user.uuid) {
        return (
            <Container className="py-20 text-center italic">
                Carregando perfil...
            </Container>
        )
    }

    const isAluno = user.type === TIPO_USUARIO.ALUNO

    const alunoData = user as unknown as Aluno
    const pacienteData = user as unknown as Paciente

    return (
        <Container className="py-10">
            <Row>
                <Col cols={12} lg={8}>
                    <Card className="border-none bg-secondary/50 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl font-bold">
                                {isAluno
                                    ? 'Dados do Acadêmico'
                                    : 'Dados do Paciente'}
                            </CardTitle>
                            <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground uppercase">
                                {user.type}
                            </span>
                        </CardHeader>
                        <CardContent>
                            <ItemGroup className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
                                <Item>
                                    <ItemContent>
                                        <ItemTitle className="text-xs font-bold uppercase opacity-50">
                                            Nome Completo
                                        </ItemTitle>
                                        <ItemDescription className="text-lg font-medium">
                                            {isAluno
                                                ? alunoData.nome
                                                : pacienteData.nome}
                                        </ItemDescription>
                                    </ItemContent>
                                </Item>

                                <Item>
                                    <ItemContent>
                                        <ItemTitle className="text-xs font-bold uppercase opacity-50">
                                            Status no Sistema
                                        </ItemTitle>
                                        <div className="mt-1 flex items-center gap-2">
                                            <div
                                                className={`h-2.5 w-2.5 rounded-full ${alunoData.ativo ? 'bg-green-500' : 'bg-red-500'}`}
                                            />
                                            <ItemDescription className="text-sm font-bold uppercase">
                                                {isAluno
                                                    ? alunoData.ativo
                                                        ? 'Ativo'
                                                        : 'Inativo'
                                                    : pacienteData.prontuario_status}
                                            </ItemDescription>
                                        </div>
                                    </ItemContent>
                                </Item>

                                {isAluno && (
                                    <>
                                        <Item>
                                            <ItemContent>
                                                <ItemTitle className="text-xs font-bold uppercase opacity-50">
                                                    Email
                                                </ItemTitle>
                                                <ItemDescription className="text-lg font-medium">
                                                    {alunoData.email}
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                        <Item>
                                            <ItemContent>
                                                <ItemTitle className="text-xs font-bold uppercase opacity-50">
                                                    Matrícula
                                                </ItemTitle>
                                                <ItemDescription className="text-lg font-medium">
                                                    {alunoData.matricula}
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                        <Item>
                                            <ItemContent>
                                                <ItemTitle className="text-xs font-bold uppercase opacity-50">
                                                    Semestre
                                                </ItemTitle>
                                                <ItemDescription className="text-lg font-medium">
                                                    {alunoData.periodo}º Período
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                    </>
                                )}

                                {!isAluno && (
                                    <>
                                        <Item>
                                            <ItemContent>
                                                <ItemTitle className="text-xs font-bold uppercase opacity-50">
                                                    CPF
                                                </ItemTitle>
                                                <ItemDescription className="text-lg font-medium">
                                                    {pacienteData.cpf}
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                        <Item>
                                            <ItemContent>
                                                <ItemTitle className="text-xs font-bold uppercase opacity-50">
                                                    Nascimento
                                                </ItemTitle>
                                                <ItemDescription className="text-lg font-medium">
                                                    {new Date(
                                                        pacienteData.data_nascimento
                                                    ).toLocaleDateString(
                                                        'pt-br'
                                                    )}
                                                </ItemDescription>
                                            </ItemContent>
                                        </Item>
                                    </>
                                )}
                            </ItemGroup>
                        </CardContent>
                    </Card>
                </Col>

                <Col cols={12} lg={4}>
                    <Card className="flex h-full flex-col border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">
                                Segurança
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-6">
                            <Item>
                                <ItemContent>
                                    <ItemTitle className="text-xs font-bold uppercase opacity-50">
                                        Identificador (UUID)
                                    </ItemTitle>
                                    <ItemDescription className="font-mono text-[10px] break-all opacity-60">
                                        {user.uuid}
                                    </ItemDescription>
                                </ItemContent>
                            </Item>

                            <div className="border-t border-secondary pt-4">
                                <p className="text-[11px] leading-relaxed text-muted-foreground">
                                    Os dados acima são de uso restrito da
                                    clínica escola. Mantenha suas informações
                                    atualizadas.
                                </p>
                            </div>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <button className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground transition-all hover:opacity-90">
                                Redefinir Senha
                            </button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
