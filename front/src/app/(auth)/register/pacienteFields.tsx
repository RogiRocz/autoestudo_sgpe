'use client'

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function PacienteFields() {
    // nome: string
    // cpf: string
    // data_nascimento: Date;
    return (
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input id="name" type="text"></Input>
        </Field>
        <Field>
          <FieldLabel htmlFor="cpf">CPF</FieldLabel>
          <Input id="cpf" type="text"></Input>
        </Field>
        <Field>
          <FieldLabel htmlFor="birth">Data de Nascimento</FieldLabel>
          <Input id="birth" type="text"></Input>
        </Field>
      </FieldGroup>
    )
}
