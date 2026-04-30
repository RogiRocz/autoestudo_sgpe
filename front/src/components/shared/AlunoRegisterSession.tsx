'use client'

import { useFormContext } from 'react-hook-form'
import { FieldGroup, Field, FieldLabel } from '../ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import {
    prontuarioDefaultValues,
    prontuarioFieldsSchema,
    ProntuarioRegisterForms,
} from '@/utils/schemas.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { People, Event } from '@mui/icons-material'

export function AlunoRegisterSession() {
    const {
        register,
        control,
        formState: errors,
    } = useFormContext<ProntuarioRegisterForms>()

    return (
        <>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="paciente">Pacinete</FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <People />
                        </InputGroupAddon>
                        <InputGroupInput type='search' id="paciente" onInput={searchPacientes}></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="data_hora">Data e hora</FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <Event />
                        </InputGroupAddon>
                        <InputGroupInput id="data_hora"></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="duracao">
                        Duração atendimento
                    </FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="duracao"></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="tipo_sessao">
                        Tipo da sessão
                    </FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="tipo_sessao"></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="local">Local da sessão</FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="local"></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="status">Status da sessão</FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="status"></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="observacoes">Observações</FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="observacoes"></InputGroupInput>
                    </InputGroup>
                </Field>
            </FieldGroup>
        </>
    )
}
