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
import { Prontuario } from '@/types/prontuario/prontuario.interface'
interface Props extends Prontuario {
    title: string
}

export function CardSesison(props: Props) {
    return (
        <Card className='my-8 bg-secondary w-[20%]'>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ItemGroup>
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
                <span>
                    {new Date(props.data_hora).toLocaleString('pt-br')} 
                </span>
            </CardFooter>
        </Card>
    )
}
