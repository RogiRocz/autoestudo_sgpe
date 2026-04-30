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
import { useSearchPacientes } from '@/hooks/queries/usePaciente.hook'
import { useState } from 'react'
import { Paciente } from '@/types/paciente/paciente.interface'
import { SuggestionList } from './SuggestionList'

export function AlunoRegisterSession() {
    const [searchWord, setSearchWord] = useState('')
    const { data: pacientes, isLoading } = useSearchPacientes(searchWord)
    const [showSuggestions, setShowSuggestions] = useState(false)
    console.log(pacientes);
    

    const {
        register,
        control,
        setValue,
        formState: errors,
    } = useFormContext<ProntuarioRegisterForms>()

    return (
        <>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="paciente">Pacinete</FieldLabel>
                    <div className="relative w-full">
                        <InputGroup {...register}>
                            <InputGroupAddon id="icon">
                                <People />
                            </InputGroupAddon>
                            <InputGroupInput
                                type="search"
                                id="paciente"
                                value={searchWord}
                                onInput={(e) => {
                                    setSearchWord(e.currentTarget.value)
                                    setShowSuggestions(true)
                                }}
                                onFocus={() => setShowSuggestions(true)}
                            ></InputGroupInput>
                        </InputGroup>
                        <SuggestionList
                            show={showSuggestions}
                            data={pacientes}
                            isLoading={isLoading}
                            labelExtractor={(p: any) => p.nome}
                            onClose={() => setShowSuggestions(false)}
                            onSelect={(p: Paciente) => {
                                setValue('paciente_id', p.uuid)
                                setSearchWord(p.nome)
                                setShowSuggestions(false)
                            }}
                        />
                    </div>
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
