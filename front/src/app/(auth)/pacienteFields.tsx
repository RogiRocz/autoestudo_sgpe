'use client'

import { Button } from '@/components/ui/button'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    RegisterFormValues,
    PacienteFormValues,
} from '@/utils/schemas.validator'
import { cpfMask } from '@/utils/stringFormat.validator'
import { format } from 'date-fns'
import { Controller, FieldErrors, useFormContext } from 'react-hook-form'
import { EditCalendarOutlined } from '@mui/icons-material'
import { Calendar } from '@/components/ui/calendar'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group'
import { HideInput } from '@/components/shared/HideInput'
import { useState } from 'react'
import { DatePicker } from '@/components/shared/DatePicker'

export function PacienteFields({ isLogin = false }: { isLogin?: boolean }) {
    const {
        register,
        setValue,
        control,
        formState: { errors: baseErrors },
    } = useFormContext<RegisterFormValues>()
    const errors = baseErrors as FieldErrors<PacienteFormValues>

    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setValue('cpf', cpfMask(value), { shouldValidate: true })
    }

    const [isVisible, setVisibility] = useState(false)

    return (
        <>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="cpf">CPF</FieldLabel>
                    <Input
                        id="cpf"
                        type="text"
                        {...register('cpf')}
                        onChange={handleCpfChange}
                    ></Input>
                    <FieldError errors={[errors.cpf]}></FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <InputGroup>
                        <InputGroupInput
                            id="password"
                            type={isVisible ? 'text' : 'password'}
                            className="placeholder:text-muted-white placeholder:font-semibold"
                            {...register('senha')}
                        ></InputGroupInput>
                        <InputGroupAddon align={'inline-end'}>
                            <HideInput
                                value={isVisible}
                                onChange={(v) => setVisibility(v)}
                            />
                        </InputGroupAddon>
                    </InputGroup>
                    <FieldError errors={[errors.senha]}></FieldError>
                </Field>

                {!isLogin && (
                    <>
                        <Field>
                            <FieldLabel htmlFor="nome">Nome</FieldLabel>
                            <Input
                                id="nome"
                                type="text"
                                {...register('nome')}
                            ></Input>
                            <FieldError errors={[errors.nome]}></FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="data_nascimento">
                                Data de Nascimento
                            </FieldLabel>
                            <DatePicker
                                control={control}
                                name="data_nascimento"
                            />
                            <FieldError
                                errors={[errors.data_nascimento]}
                            ></FieldError>
                        </Field>
                    </>
                )}
            </FieldGroup>
        </>
    )
}
