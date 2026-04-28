"use client"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { TIPO_USUARIO } from "@/types/enums/enums"
import {
  alunoFieldsSchema,
  DefaultValuesByType,
  FormValues,
  pacienteFieldsSchema,
} from "@/utils/schemas.validator"
import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegisterUser } from "@/hooks/mutations/useAuthMutations.mutation"
import { PacienteFields } from "../pacienteFields"
import { AlunoFields } from "../alunoFields"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [userTypeRegister, setTypeRegister] = useState(TIPO_USUARIO.PACIENTE)
  const { mutate } = useRegisterUser()
  const router = useRouter()

  const methods = useForm<FormValues>({
    resolver: zodResolver(
      userTypeRegister === TIPO_USUARIO.PACIENTE
        ? pacienteFieldsSchema
        : alunoFieldsSchema
    ) as any,
    defaultValues: DefaultValuesByType[userTypeRegister],
    mode: 'onChange'
  })

  const { reset, handleSubmit } = methods

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formattedData = {
      ...data,
      ...("cpf" in data && { cpf: data.cpf.replace(/\D/g, "") }),
    }

    mutate({
      type: userTypeRegister,
      userData: formattedData as any,
    }, {
      onSuccess: () => router.push('/')
    })
  }

  return (
    <div className="my-auto h-[80%] justify-center overflow-auto">
      <div className="my-6">
        <div className="mb-4 flex flex-row justify-center">
          <FieldGroup className="max-w-sm flex-row justify-center gap-10">
            <Field orientation={"horizontal"} className="w-fit">
              <FieldLabel htmlFor="type_register">
                {userTypeRegister}
              </FieldLabel>
              <Switch
                id="type_register"
                className="w-full data-[state=checked]:bg-chart-2"
                onCheckedChange={(v) => {
                  const newType = v ? TIPO_USUARIO.ALUNO : TIPO_USUARIO.PACIENTE
                  setTypeRegister(newType)

                  reset(DefaultValuesByType[newType])
                }}
              />
            </Field>
            <Field className="w-fit">
              <Button
                variant={"link"}
                className="bg-background text-(--chart-2) hover:bg-(--chart-2) hover:text-white"
              >
                <Link href={"/login"} transitionTypes={["slide-in"]}>
                  Já tem conta?
                </Link>
              </Button>
            </Field>
          </FieldGroup>
        </div>
        <header className="flex-row space-y-4">
          <h1 className="text-center text-2xl font-bold">
            Registro de {userTypeRegister.toLowerCase()}
          </h1>
          <p className="text-muted-background text-center">
            Preencha com as informações necessárias
          </p>
        </header>
      </div>
      <div className="mx-auto w-[50%]">
        <FormProvider {...methods}>
          <form
            id="form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col align-center w-full justify-center"
          >
            {userTypeRegister === TIPO_USUARIO.PACIENTE ? (
              <PacienteFields />
            ) : (
              <AlunoFields />
            )}
            <ButtonGroup className="mt-6 gap-x-4 mx-auto" orientation={"horizontal"}>
              <Button
                type="reset"
                variant={"destructive"}
                className="bg-background"
              >
                Apagar Campos
              </Button>
              <Button
                type="submit"
                form="form"
                variant={"outline"}
                className="bg-chart-2"
              >
                Registrar
              </Button>
            </ButtonGroup>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
