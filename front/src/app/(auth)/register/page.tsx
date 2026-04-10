"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { TIPO_USUARIO } from "@/types/enums/enums"
import { useState } from "react"

export default function RegisterPage() {
  const [userTypeRegister, setTypeRegister] = useState(TIPO_USUARIO.PACIENTE)

  return (
    <div className="my-auto h-[80%]">
      <div className="mb-4 flex flex-row justify-center">
        <Field orientation={"horizontal"} className="w-fit">
          <FieldLabel htmlFor="type_register">{userTypeRegister}</FieldLabel>
          <Switch
            id="type_register"
            className="w-full data-[state=checked]:bg-chart-2"
            onCheckedChange={(v) =>
              v
                ? setTypeRegister(TIPO_USUARIO.ALUNO)
                : setTypeRegister(TIPO_USUARIO.PACIENTE)
            }
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
  )
}
