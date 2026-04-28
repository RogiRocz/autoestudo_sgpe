import { JwtPayload } from 'jsonwebtoken'
import { UserType } from '../interfaces/IAuth.interface'

export class UserPayload implements JwtPayload {
    sub: string
    type: UserType
    iat?: number
    exp?: number
}
