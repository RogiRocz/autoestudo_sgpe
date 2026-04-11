"use client"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormValues } from "@/utils/schemas.validator"
import { Control, UseFormRegister } from "react-hook-form"

export function PacienteFields({register, control} : {register: UseFormRegister<FormValues>, control?: Control}) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="nome">Nome</FieldLabel>
        <Input id="nome" type="text" {...register('nome')}></Input>
      </Field>
      <Field>
        <FieldLabel htmlFor="cpf">CPF</FieldLabel>
        <Input id="cpf" type="text" {...register('cpf')}></Input>
      </Field>
      <Field>
        <FieldLabel htmlFor="senha">Senha</FieldLabel>
        <Input id="senha" type="text" {...register('senha')}></Input>
      </Field>
      <Field>
        <FieldLabel htmlFor="data_nascimento">Data de Nascimento</FieldLabel>
        <Input id="data_nascimento" type="text" {...register('data_nascimento')}></Input>
      </Field>
    </FieldGroup>
  )
}
