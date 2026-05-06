'use client'

import {
    LOCAL_SESSAO,
    PRONTUARIO_STATUS,
    TIPO_SESSAO,
} from '@/types/enums/enums'
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

interface Props {
    title: string
    paciente: string
    aluno: string
    data_hora: Date
    tipo: TIPO_SESSAO
    local: LOCAL_SESSAO
    status: PRONTUARIO_STATUS
}

export function CardSesison(props: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ItemGroup>
                    <Item>
                        <ItemContent>
                            <ItemTitle>Tipo</ItemTitle>
                            <ItemDescription>{props.tipo}</ItemDescription>
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
                <span>{props.data_hora.toISOString()}</span>
            </CardFooter>
        </Card>
    )
}
