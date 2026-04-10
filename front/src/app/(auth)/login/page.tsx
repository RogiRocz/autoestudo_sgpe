"use client"

import { HideInput } from "@/components/shared/HideInput"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const [isVisible, setVisibility] = useState(false)

  return (
    <div className="my-auto h-[80%]">
      <header className="flex-row space-y-4">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <p className="text-muted-background text-center">
          Insira suas credenciais para acessar o sistema.
        </p>
      </header>
      <form
        action=""
        className="flex h-full w-full flex-1 flex-col justify-center px-[6vw]"
      >
        <FieldGroup className="mx-auto flex w-[60%] flex-col">
          <Field orientation={"horizontal"}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="text"
              placeholder="Insira seu email"
              className="placeholder:text-muted-white h-auto py-3 placeholder:font-semibold"
            ></Input>
          </Field>
          <Field orientation={"horizontal"}>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <InputGroup className="h-auto">
              <InputGroupInput
                id="password"
                type={isVisible ? "text" : "password"}
                placeholder="Insira seu senha"
                className="placeholder:text-muted-white h-auto py-3 placeholder:font-semibold"
              ></InputGroupInput>
              <InputGroupAddon align={"inline-end"}>
                <HideInput
                  value={isVisible}
                  onChange={(v) => setVisibility(v)}
                />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
        <FieldGroup className="mt-14 flex">
          <Field
            orientation={"horizontal"}
            className="items-centerjustify-center flex-col gap-y-6"
          >
            <Button
              variant={"outline"}
              className="w-30 bg-chart-2 hover:text-(--chart-2)"
            >
              Entrar
            </Button>
            <Button
              variant={"link"}
              className="w-50 bg-background text-(--chart-2) hover:bg-(--chart-2) hover:text-white"
            >
              <Link href={"/register"} transitionTypes={["slide-in"]}>
                Quer se cadastrar?
              </Link>
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
