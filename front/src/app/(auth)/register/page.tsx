"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { TIPO_USUARIO } from "@/types/enums/enums"
import {
  alunoFieldsSchema,
  DefaultValuesByType,
  FormValues,
  pacienteFieldsSchema,
} from "@/utils/schemas.validator"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegisterUser } from "@/hooks/mutations/useAuthMutations.mutation"
import { PacienteFields } from "./pacienteFields"
import { AlunoFields } from "./alunoFields"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const [userTypeRegister, setTypeRegister] = useState(TIPO_USUARIO.PACIENTE)
  const { mutate } = useRegisterUser()
  const { register, handleSubmit, reset, control } = useForm<FormValues>({
    resolver: zodResolver(
      userTypeRegister === TIPO_USUARIO.PACIENTE
        ? pacienteFieldsSchema
        : alunoFieldsSchema
    ) as any,
    defaultValues: DefaultValuesByType[userTypeRegister],
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate({
      type: userTypeRegister,
      userData: data as any,
    })
  }

  return (
    <div className="justify-center overflow-auto">
      <div className="my-6">
        <div className="mb-4 flex flex-row justify-center">
          <Field orientation={"horizontal"} className="w-fit">
            <FieldLabel htmlFor="type_register">{userTypeRegister}</FieldLabel>
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
      <div className="flex flex-row w-[50%] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {userTypeRegister === TIPO_USUARIO.PACIENTE ? (
            <PacienteFields register={register} />
          ) : (
            <AlunoFields register={register} control={control} />
          )}
          <ButtonGroup className="mt-6 gap-x-4" orientation={"horizontal"}>
            <Button type="reset" variant={"destructive"} className="bg-background">
              Apagar Campos
            </Button>
            <Button type="submit" variant={"outline"} className="bg-chart-2">
              Registrar
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  )
}
