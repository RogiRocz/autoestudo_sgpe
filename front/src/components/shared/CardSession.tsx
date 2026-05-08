'use client'

import {
    CardTitle,
    CardFooter,
    Card,
    CardContent,
    CardHeader,
} from '../ui/card'
import {
    ItemGroup,
    Item,
    ItemContent,
    ItemTitle,
    ItemDescription,
} from '../ui/item'
import { Prontuario } from '@/types/prontuario/prontuario.interface'
interface Props extends Prontuario {
    showPacientes?: boolean
    showAlunos?: boolean
    showAll?: boolean
    title: string
}

export function CardSesison(props: Props) {
    const exibirPaciente = props.showAll || props.showPacientes
    const exibirAluno = props.showAll || props.showAlunos

    // console.log(exibirAluno, exibirPaciente);
    // console.log(props.paciente);

    return (
        <Card className="flex h-full w-full flex-col bg-secondary">
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ItemGroup>
                    {exibirPaciente && props.paciente && (
                        <Item>
                            <ItemContent>
                                <ItemTitle>Paciente</ItemTitle>
                                <ItemDescription>
                                    {props.paciente.nome}
                                </ItemDescription>
                            </ItemContent>
                        </Item>
                    )}

                    {exibirAluno && props.aluno && (
                        <Item>
                            <ItemContent>
                                <ItemTitle>Aluno</ItemTitle>
                                <ItemDescription>
                                    {props.aluno.nome}
                                </ItemDescription>
                            </ItemContent>
                        </Item>
                    )}

                    <Item>
                        <ItemContent>
                            <ItemTitle>Tipo</ItemTitle>
                            <ItemDescription>
                                {props.tipo_sessao}
                            </ItemDescription>
                        </ItemContent>
                    </Item>
                    <Item>
                        <ItemContent>
                            <ItemTitle>Local</ItemTitle>
                            <ItemDescription>{props.local}</ItemDescription>
                        </ItemContent>
                    </Item>
                    <Item>
                        <ItemContent>
                            <ItemTitle>Status</ItemTitle>
                            <ItemDescription>{props.status}</ItemDescription>
                        </ItemContent>
                    </Item>
                </ItemGroup>
            </CardContent>
            <CardFooter>
                <span>{new Date(props.data_hora).toLocaleString('pt-br')}</span>
            </CardFooter>
        </Card>
    )
}
