import { CreateAlunoDTO } from "../aluno/aluno.dto"
import { TIPO_CAMPO_LOGIN, TIPO_USUARIO } from "../enums/enums"
import { CreatePacienteDTO } from "../paciente/paciente.dto"
import { UserPayload } from "./payload"

export type LoginRequest = {
    login: string
    senha: string
    field: TIPO_CAMPO_LOGIN,
    type: TIPO_USUARIO
}

export type RegisterUser = {
    type: TIPO_USUARIO
    userData: CreateAlunoDTO | CreatePacienteDTO
}

export type LoginResponse = {
    token: string,
    user: UserPayload
}