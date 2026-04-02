import { Exclude } from "class-transformer";
import { CreateAlunoDTO } from "@modules/aluno/dto/create-aluno.dto";
import { Aluno } from "@modules/aluno/entities/aluno.entity"
import { Fields } from "@modules/auth/dto/login.dto";
import { CreatePacienteDTO } from "@modules/paciente/dto/create-paciente.dto";
import { Paciente } from "@modules/paciente/entites/paciente.entity"

export enum UserType {
    PACIENTE = 'paciente',
    ALUNO = 'aluno'
}

export type UserEntityMap = {
    [UserType.ALUNO]: Aluno
    [UserType.PACIENTE]: Paciente
}

export type CreateDTOMap = {
    [UserType.ALUNO]: CreateAlunoDTO
    [UserType.PACIENTE]: CreatePacienteDTO
}

export interface IAuthenticatable {
    uuid: string
    senha: string
}

export interface IAuthService<D = any, E extends IAuthenticatable = any> {
    findByIdentifier(login: string, field?: Fields): Promise<E | null>
    findById(id: string): Promise<E>
    create(dados: D): Promise<E>
}

export abstract class BaseUser implements IAuthenticatable {
    uuid: string;

    @Exclude({ toClassOnly: true })
    senha: string;
}