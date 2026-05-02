import { Paciente } from '@/types/paciente/paciente.interface'
import { ProntuarioRegisterPacienteForms } from '@/utils/schemas.validator'
import { Event, People } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { FieldGroup, Field, FieldLabel } from '../ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { DatePicker } from './DatePicker'
import { SuggestionList } from './SuggestionList'
import { TimePicker } from './TimePicker'
import { useState } from 'react'
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

    return (
        <>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="aluno">Aluno</FieldLabel>
                    <div className="relative w-full">
                        <InputGroup {...register}>
                            <InputGroupAddon id="icon">
                                <People />
                            </InputGroupAddon>
                            <InputGroupInput
                                type="search"
                                id="aluno"
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
            </FieldGroup>
        </>
    )
}
