import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UserPayload } from "../../common/dto/UserPayload.dto";
import { ModuleRef } from "@nestjs/core";
import { CreateDTOMap, IAuthenticatable, IAuthService, UserEntityMap, UserType } from "../../common/interfaces/IAuth.interface";
import { HashHelper } from "../../common/utils/Hashing.helper";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginDTO } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
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

    async registerUser<K extends UserType>(type: K, dados: CreateDTOMap[K]){
        const service = this.getService(type) as IAuthService<CreateDTOMap[K], UserEntityMap[K]>

        if(!dados.senha){
            throw new BadRequestException('Falha no registro: Senha não fornecida do DTO')
        }

        const hashedPassword = await this.cript.hashingPassword(dados.senha)
        const novoUsuarioDados = { ...dados, senha: hashedPassword } as CreateDTOMap[K]

        const novoUsuario = await service.create(novoUsuarioDados)
        const payload: UserPayload = {
            sub: novoUsuario.uuid,
            type: type
        }

        return payload
    }

    async loginUser<K extends UserType>(type: K, credenciais: Omit<LoginDTO, 'type'>){
        try {
            const service = this.getService(type)
            const userDB = await service.findByIdentifier(credenciais.login) as UserEntityMap[K]
            
            await this.cript.comparePasswords(credenciais.senha, userDB.senha)

            const payload: UserPayload = {
                sub: userDB.uuid,
                type
            }

            return payload
        } catch (error) {
            throw new UnauthorizedException('Falha no login: Credenciais erradas')
        }
    }
}