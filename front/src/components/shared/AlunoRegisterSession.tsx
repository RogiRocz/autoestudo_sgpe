'use client'

import { useFormContext } from 'react-hook-form'
import { FieldGroup, Field, FieldLabel } from '../ui/field'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupTextarea,
} from '../ui/input-group'
import {
    prontuarioDefaultValues,
    prontuarioFieldsSchema,
    ProntuarioRegisterForms,
} from '@/utils/schemas.validator'
import {
    People,
    Event,
    Timer,
    Rule,
    Room,
    Pending,
    Notes,
} from '@mui/icons-material'
import { useSearchPacientes } from '@/hooks/queries/usePaciente.hook'
import { useState } from 'react'
import { Paciente } from '@/types/paciente/paciente.interface'
import { SuggestionList } from './SuggestionList'
import { TimePicker } from './TimePicker'
import { DatePicker } from './DatePicker'
import { useConfigEnums } from '@/hooks/queries/useConfigEnums.hook'
import {
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    Select,
    SelectItem,
} from '../ui/select'

export function AlunoRegisterSession() {
    const [searchWord, setSearchWord] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [data, setData] = useState(undefined)
    const [hora, setHora] = useState(undefined)

    const { data: pacientes, isLoading: loadingPacientes } =
        useSearchPacientes(searchWord)
    const { data: configEnums, isLoading: loadingConfigs } = useConfigEnums()

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
                    <FieldLabel htmlFor="paciente">Paciente</FieldLabel>
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
                            isLoading={loadingPacientes}
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
                <Field orientation={'horizontal'}>
                    <FieldLabel htmlFor="data_hora">Data e hora</FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <Event />
                        </InputGroupAddon>
                        <InputGroup id="data_hora">
                            <DatePicker control={control} name="data_hora" />
                            <TimePicker id="tempo_hora" />
                        </InputGroup>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="duracao">
                        Duração atendimento
                    </FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <Timer />
                        </InputGroupAddon>
                        <InputGroupInput
                            id="duracao"
                            type="number"
                            step={15}
                            max={60}
                            min={0}
                        ></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="tipo_sessao">
                        Tipo da sessão
                    </FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <Rule />
                        </InputGroupAddon>
                        <Select>
                            <SelectTrigger id="tipo_sessao">
                                <SelectValue></SelectValue>
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                                <SelectGroup>
                                    {!loadingConfigs &&
                                        configEnums?.tiposSessao?.map(
                                            (tipo) => {
                                                return (
                                                    <SelectItem
                                                        key={tipo}
                                                        value={tipo.toString()}
                                                    >
                                                        {tipo}
                                                    </SelectItem>
                                                )
                                            }
                                        )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="local">Local da sessão</FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <Room />
                        </InputGroupAddon>
                        <Select>
                            <SelectTrigger id="local">
                                <SelectValue></SelectValue>
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                                <SelectGroup>
                                    {!loadingConfigs &&
                                        configEnums?.locaisSessao?.map(
                                            (local) => {
                                                return (
                                                    <SelectItem
                                                        key={local}
                                                        value={local.toString()}
                                                    >
                                                        {local}
                                                    </SelectItem>
                                                )
                                            }
                                        )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="status">Status da sessão</FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <Pending />
                        </InputGroupAddon>
                        <Select>
                            <SelectTrigger id="status">
                                <SelectValue></SelectValue>
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                                <SelectGroup>
                                    {!loadingConfigs &&
                                        configEnums?.prontuarioStatus?.map(
                                            (status) => {
                                                return (
                                                    <SelectItem
                                                        key={status}
                                                        value={status.toString()}
                                                    >
                                                        {status}
                                                    </SelectItem>
                                                )
                                            }
                                        )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="observacoes">Observações</FieldLabel>
                    <InputGroup {...register}>
                        <InputGroupAddon id="icon">
                            <Notes />
                        </InputGroupAddon>
                        <InputGroupTextarea id="observacoes"></InputGroupTextarea>
                    </InputGroup>
                </Field>
            </FieldGroup>
        </>
    )
}
