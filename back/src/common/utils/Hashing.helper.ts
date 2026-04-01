import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

@Injectable()
export class HashHelper {
    private SaltRound: number

    constructor() {
        this.SaltRound = 12
    }

    async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await compare(plainPassword, hashedPassword)
    }

    async hashingPassword(plainPassword: string): Promise<string> {
        try {
            return await hash(plainPassword, this.SaltRound)
        } catch (error) {
            throw new InternalServerErrorException('Erro ao encriptar a senha. Erro: ' + error)
        }
    }
}