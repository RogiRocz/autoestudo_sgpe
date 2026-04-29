import { TIPO_USUARIO } from '../enums/enums'

export interface UserPayload {
    sub: string
    type: TIPO_USUARIO
    iat?: number
    exp?: number
}
