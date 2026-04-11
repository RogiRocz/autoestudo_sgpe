"use client"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Select,
} from "@/components/ui/select"
import { PAPEIS } from "@/types/enums/enums"
import { FormValues } from "@/utils/schemas.validator"
import { capitalize } from "@/utils/stringFormat.validator"
import { Control, Controller, UseFormRegister } from "react-hook-form"

export function AlunoFields({
  register,
  control,
}: {
  register: UseFormRegister<FormValues>
  control: Control<FormValues, any, FormValues>
}) {
  const listaPapeis = Object.values(PAPEIS)

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="matricula">Matrícula</FieldLabel>
        <Input id="matricula" type="text" {...register("matricula")}></Input>
      </Field>
      <Field>
        <FieldLabel htmlFor="nome">Nome</FieldLabel>
        <Input id="nome" type="text" {...register("nome")}></Input>
      </Field>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="text" {...register("email")}></Input>
      </Field>
      <Field>
        <FieldLabel htmlFor="senha">Senha</FieldLabel>
        <Input id="senha" type="text" {...register("senha")}></Input>
      </Field>
      <Field>
        <FieldLabel htmlFor="periodo">Periodo</FieldLabel>
        <Input id="periodo" type="number" {...register("periodo")}></Input>
      </Field>
      <Field>
        <FieldLabel htmlFor="papel">Papel</FieldLabel>
        <Controller
          name="papel"
          control={control}
          render={({ field }) => (
            <Select
              disabled
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={capitalize(listaPapeis[0])}
            >
              <SelectTrigger id="papel">
                <SelectValue placeholder="Escolha um papel"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                <SelectLabel>Papeis</SelectLabel>
                  {listaPapeis.map((papel) => (
                    <SelectItem key={papel} value={papel}>
                      {capitalize(papel)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        ></Controller>
      </Field>
    </FieldGroup>
  )
}
