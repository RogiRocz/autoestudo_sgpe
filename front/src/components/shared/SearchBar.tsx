'use client'

import { InputEventHandler } from 'react'
import { Field, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
    searchFor: string
    searchFunc: InputEventHandler
    entity: string
}

export function SearchBar(props: Partial<Props>) {
    return (
        <Field orientation={'horizontal'}>
            <FieldLabel htmlFor="search_bar">
                Pesquisa por {props.searchFor}
            </FieldLabel>
            <Input
                id="search_bar"
                type="search"
                placeholder={`Escreva o ${props.searchFor} do ${props.entity}`}
                minLength={3}
                onInput={props.searchFunc}
            ></Input>
            <Button variant={'outline'} size={'icon'}>
                <SearchIcon />
            </Button>
        </Field>
    )
}
