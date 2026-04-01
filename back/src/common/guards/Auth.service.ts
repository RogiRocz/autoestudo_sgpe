import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UserPayload } from "../dto/UserPayload.dto";
import { ModuleRef } from "@nestjs/core";
import { IAuthenticatable, IAuthService, UserEntityMap, UserType } from "../interfaces/IAuth.interface";
import { HashHelper } from "../utils/Hashing.helper";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly moduleRef: ModuleRef,
        private cript: HashHelper
    ) { }

    getService(nameType: string) {
        if (!Object.values(UserType).includes(nameType.toUpperCase() as UserType)) {
            throw new BadRequestException('Falha na requisição: tipo de usário inválido')
        }

        const serviceName = `${nameType.charAt(0).toUpperCase() + nameType.slice(1)}Service`
        return this.moduleRef.get<IAuthService>(serviceName, { strict: false })
    }

    async getUser<T extends UserEntityMap[UserType]>(payload: UserPayload): Promise<T> {
        try {
            const service = this.getService(payload.type)
            const user = await service.findById(payload.sub)

            return user
        } catch (error) {
            throw error
        }
    }

    async verifyPassword<T extends IAuthenticatable>(user: T, plainPass: string): Promise<boolean>{
        const result = await this.cript.comparePasswords(plainPass, user.senha)

        if(!result){
            throw new UnauthorizedException('Falha no login: Usuário não autorizado')
        }

        return true
    }

    async createToken<T extends IAuthenticatable>(user: T, type: UserType) : Promise<string>{
        try {
            const payload: UserPayload = {
                sub: user.uuid,
                type: type,
            }    

            return await this.jwtService.signAsync(payload)
        } catch (error) {
            throw new InternalServerErrorException('Falha na criação do token: Erro: ' + error)
        }        
    }

    async verifiyToken(token: string) : Promise<UserPayload>{
        try {
            return await this.jwtService.verifyAsync(token)
        } catch (error) {
            throw new InternalServerErrorException('Falha na verificação do token: Erro: ' + error)
        }
    }
}