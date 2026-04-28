"use client"

import { HideInput } from "@/components/shared/HideInput"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
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
import { AlunoFormValues, FormValues } from "@/utils/schemas.validator"
import { capitalize } from "@/utils/stringFormat.validator"
import { useState } from "react"
import { Controller, FieldErrors, useFormContext } from "react-hook-form"

export function AlunoFields({ isLogin = false }: { isLogin?: boolean }) {
  const listaPapeis = Object.values(PAPEIS)
  const {
    register,
    formState: { errors: baseErrors },
    control,
  } = useFormContext<FormValues>()

  const errors = baseErrors as FieldErrors<AlunoFormValues>

  const [isVisible, setVisibility] = useState(false)

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="text" {...register("email")}></Input>
        <FieldError errors={[errors.email]}></FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Senha</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="password"
            type={isVisible ? "text" : "password"}
            className="placeholder:text-muted-white placeholder:font-semibold"
            {...register("senha")}
          ></InputGroupInput>
          <InputGroupAddon align={"inline-end"}>
            <HideInput value={isVisible} onChange={(v) => setVisibility(v)} />
          </InputGroupAddon>
        </InputGroup>
        <FieldError errors={[errors.senha]}></FieldError>
      </Field>

      {!isLogin && (
        <>
          <Field>
            <FieldLabel htmlFor="matricula">Matrícula</FieldLabel>
            <Input
              id="matricula"
              type="text"
              {...register("matricula")}
            ></Input>
            <FieldError errors={[errors.matricula]}></FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="nome">Nome</FieldLabel>
            <Input id="nome" type="text" {...register("nome")}></Input>
            <FieldError errors={[errors.nome]}></FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="periodo">Periodo</FieldLabel>
            <Input id="periodo" type="number" {...register("periodo")}></Input>
            <FieldError errors={[errors.periodo]}></FieldError>
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
            <FieldError errors={[errors.papel]}></FieldError>
          </Field>
        </>
      )}
    </FieldGroup>
  )
}
