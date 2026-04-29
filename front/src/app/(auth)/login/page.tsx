'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import { TIPO_CAMPO_LOGIN, TIPO_USUARIO } from '@/types/enums/enums'
import {
    LoginFormValues,
    DefaultValuesByType,
    pacienteLoginSchema,
    alunoLoginSchema,
    AlunoFormLoginValues,
    PacienteFormLoginValues,
} from '@/utils/schemas.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { PacienteFields } from '../pacienteFields'
import { AlunoFields } from '../alunoFields'
import { useLoginUser } from '@/hooks/mutations/useAuthMutations.mutation'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [userTypeRegister, setTypeRegister] = useState(TIPO_USUARIO.PACIENTE)
    const { mutate } = useLoginUser()
    const router = useRouter()

    const methods = useForm<LoginFormValues>({
        resolver: zodResolver(
            userTypeRegister === TIPO_USUARIO.PACIENTE
                ? pacienteLoginSchema
                : alunoLoginSchema
        ) as any,
        defaultValues: DefaultValuesByType[userTypeRegister],
        mode: 'onBlur',
    })

    const { reset, handleSubmit } = methods

    const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
        const isPaciente = userTypeRegister === TIPO_USUARIO.PACIENTE

        let loginValue = ''
        let fieldName = ''

        if (isPaciente) {
            loginValue = (data as PacienteFormLoginValues).cpf.replace(
                /\D/g,
                ''
            )
            fieldName = 'cpf'
        } else {
            const d = data as AlunoFormLoginValues
            loginValue = d.email || d.matricula || ''
            fieldName = d.email ? 'email' : 'matricula'
        }

        mutate(
            {
                login: loginValue,
                senha: data.senha,
                type: userTypeRegister,
                field: TIPO_CAMPO_LOGIN[
                    fieldName.toUpperCase() as keyof typeof TIPO_CAMPO_LOGIN
                ],
            },
            {
                onSuccess: () => router.push('/'),
            }
        )
    }

    return (
        <div className="my-auto h-[80%]">
            <header className="flex-row space-y-4">
                <h1 className="text-center text-2xl font-bold">Login</h1>
                <p className="text-muted-background text-center">
                    Insira suas credenciais para acessar o sistema.
                </p>
            </header>
            <div className="mx-auto flex w-[50%] flex-row justify-center">
                <FormProvider {...methods}>
                    <form
                        id="form"
                        onSubmit={handleSubmit(onSubmit, (errors) =>
                            console.log('ERROS DE VALIDAÇÃO:', errors)
                        )}
                        className="w-full"
                    >
                        <header className="align-center my-10 flex justify-center">
                            <Field orientation={'horizontal'} className="w-fit">
                                <FieldLabel htmlFor="type_register">
                                    {userTypeRegister}
                                </FieldLabel>
                                <Switch
                                    id="type_register"
                                    className="w-full data-[state=checked]:bg-chart-2"
                                    onCheckedChange={(v) => {
                                        const newType = v
                                            ? TIPO_USUARIO.ALUNO
                                            : TIPO_USUARIO.PACIENTE
                                        setTypeRegister(newType)

                                        reset(DefaultValuesByType[newType])
                                    }}
                                />
                            </Field>
                        </header>

                        {userTypeRegister === TIPO_USUARIO.PACIENTE ? (
                            <PacienteFields isLogin={true} />
                        ) : (
                            <AlunoFields isLogin={true} />
                        )}
                        <FieldGroup className="mt-14 flex">
                            <Field
                                orientation={'horizontal'}
                                className="items-centerjustify-center flex-col gap-y-6"
                            >
                                <Button
                                    type="submit"
                                    form="form"
                                    variant={'outline'}
                                    className="w-30 bg-chart-2 hover:text-(--chart-2)"
                                >
                                    Entrar
                                </Button>
                                <Button
                                    variant={'link'}
                                    className="w-50 bg-background text-(--chart-2) hover:bg-(--chart-2) hover:text-white"
                                >
                                    <Link
                                        href={'/register'}
                                        transitionTypes={['slide-in']}
                                    >
                                        Quer se cadastrar?
                                    </Link>
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}
