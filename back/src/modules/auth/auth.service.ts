import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UserPayload } from "../../common/dto/UserPayload.dto";
import { AuthResponse, CreateDTOMap, IAuthenticatable, IAuthService, UserEntityMap, UserType } from "../../common/interfaces/IAuth.interface";
import { HashHelper } from "../../common/utils/Hashing.helper";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./dto/login.dto";
import { PacienteService } from "../paciente/paciente.service";
import { AlunoService } from "../aluno/aluno.service";
import { plainToInstance } from "class-transformer";
import { Aluno } from "@modules/aluno/entities/aluno.entity";
import { Paciente } from "@modules/paciente/entites/paciente.entity";

const TargetClasses: Record<UserType, any> = {
    [UserType.ALUNO]: Aluno,
    [UserType.PACIENTE]: Paciente,
};

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly pacienteService: PacienteService,
        private readonly alunoService: AlunoService,
        private cript: HashHelper
    ) { }

    getService(nameType: UserType): IAuthService {
        if (!Object.values(UserType).includes(nameType)) {
            throw new BadRequestException('Falha na requisição: tipo de usário inválido')
        }

        if (nameType === UserType.PACIENTE) {
            return this.pacienteService
        } else if (nameType === UserType.ALUNO) {
            return this.alunoService
        }

        throw new BadRequestException('Falha na requisição: tipo de usário inválido')
    }

    async getUser<T extends UserEntityMap[UserType]>(payload: UserPayload): Promise<T> {
        const service = this.getService(payload.type)
        const user = await service.findById(payload.sub) as T

        return user
    }

    async verifyPassword<T extends IAuthenticatable>(user: T, plainPass: string): Promise<boolean> {
        const result = await this.cript.comparePasswords(plainPass, user.senha)

        if (!result) {
            throw new UnauthorizedException('Falha no login: Usuário não autorizado')
        }

        return true
    }

    async createToken<T extends IAuthenticatable>(user: T, type: UserType): Promise<string> {
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

    async verifyToken(token: string): Promise<UserPayload> {
        try {
            return await this.jwtService.verifyAsync(token)
        } catch (error) {
            throw new InternalServerErrorException('Falha na verificação do token: Erro: ' + error)
        }
    }

    async registerUser<K extends UserType>(type: K, dados: CreateDTOMap[K]): Promise<AuthResponse<K>> {
        const service = this.getService(type) as IAuthService<CreateDTOMap[K], UserEntityMap[K]>

        if (!dados.senha) {
            throw new BadRequestException('Falha no registro: Senha não fornecida do DTO')
        }

        const hashedPassword = await this.cript.hashingPassword(dados.senha)
        const novoUsuarioDados = { ...dados, senha: hashedPassword } as CreateDTOMap[K]

        const novoUsuario = await service.create(novoUsuarioDados)
        const usuarioComTipo = {
            ...novoUsuario,
            type
        }
        const payload: UserPayload = {
            sub: novoUsuario.uuid,
            type: type
        }

        return {
            token: await this.jwtService.signAsync(payload),
            user: plainToInstance(TargetClasses[type], usuarioComTipo)
        }
    }

    async loginUser<K extends UserType>(type: K, credenciais: Omit<LoginDTO, 'type'>): Promise<AuthResponse<K>> {
        try {
            const service = this.getService(type)
            const userDB = await service.findByIdentifier(credenciais.login, credenciais.field) as UserEntityMap[K] | null

            if (!userDB) {
                throw new UnauthorizedException('Falha no login: Usuário do banco de dados não encontrado')
            }

            await this.cript.comparePasswords(credenciais.senha, userDB.senha)

            const payload: UserPayload = {
                sub: userDB.uuid,
                type,
            }

            const usuarioComTipo = {
                ...userDB,
                type
            }

            return {
                token: await this.jwtService.signAsync(payload),
                user: plainToInstance(TargetClasses[type], usuarioComTipo)
            }
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error
            }

            throw error
        }
    }
}