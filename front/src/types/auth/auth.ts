import { TIPO_CAMPO_LOGIN, TIPO_USUARIO } from "../enums/enums"
import { UserPayload } from "./payload"

export type LoginRequest = {
    login: string
    senha: string
    field: TIPO_CAMPO_LOGIN,
    type: TIPO_USUARIO
}

export type LoginResponse = {
    token: string,
    user: UserPayload
}