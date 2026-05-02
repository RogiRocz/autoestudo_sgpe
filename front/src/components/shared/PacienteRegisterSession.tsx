'use client'

import { ProntuarioRegisterPacienteForms } from '@/utils/schemas.validator'
import { Event, People } from '@mui/icons-material'
import { Control, Controller, useFormContext, useWatch } from 'react-hook-form'
import { FieldGroup, Field, FieldLabel } from '../ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { DatePicker } from './DatePicker'
import { SuggestionList } from './SuggestionList'
import { TimePicker } from './TimePicker'
import { useEffect, useState } from 'react'
import { useSearchAlunos } from '@/hooks/queries/useAluno.hook'
import { Aluno } from '@/types/aluno/aluno.interface'

export function PacienteRegisterSession() {
    const [searchWord, setSearchWord] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)

    const { data: alunos, isLoading: loadingAlunos } =
        useSearchAlunos(searchWord)

    const {
        register,
        control,
        setValue,
        formState: errors,
    } = useFormContext<ProntuarioRegisterPacienteForms>()

    const alunoId = useWatch({
        control,
        name: 'aluno_id',
    })

    useEffect(() => {
        if (!alunoId) {
            setSearchWord('')
        }
    }, [alunoId])

    return (
        <>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="aluno">Aluno</FieldLabel>
                    <div className="relative w-full">
                        <Controller
                            control={control}
                            name="aluno_id"
                            render={({ field }) => (
                                <InputGroup>
                                    <InputGroupAddon id="icon">
                                        <People />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        type="search"
                                        id="aluno"
                                        value={searchWord}
                                        {...register}
                                        onInput={(e) => {
                                            const val = e.currentTarget.value
                                            setSearchWord(val)
                                            setShowSuggestions(true)
                                            if (val === '')
                                                field.onChange(undefined)
                                        }}
                                        onFocus={() => setShowSuggestions(true)}
                                    ></InputGroupInput>
                                </InputGroup>
                            )}
                        />
                        <SuggestionList
                            show={showSuggestions}
                            data={alunos}
                            isLoading={loadingAlunos}
                            labelExtractor={(p: any) => p.nome}
                            onClose={() => setShowSuggestions(false)}
                            onSelect={(p: Aluno) => {
                                setValue('aluno_id', p.uuid)
                                setSearchWord(p.nome)
                                setShowSuggestions(false)
                            }}
                        />
                    </div>
                </Field>
                <Field orientation={'horizontal'}>
                    <FieldLabel htmlFor="data_hora">Data e hora</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon id="icon">
                            <Event />
                        </InputGroupAddon>
                        <InputGroup id="data_hora">
                            <DatePicker
                                {...register('data_hora')}
                                control={control}
                                name="data_hora"
                            />
                            <TimePicker
                                {...register('data_hora')}
                                id="tempo_hora"
                            />
                        </InputGroup>
                    </InputGroup>
                </Field>
            </FieldGroup>
        </>
    )
}
