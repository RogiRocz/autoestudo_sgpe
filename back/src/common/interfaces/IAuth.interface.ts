import { Exclude } from "class-transformer";
import { Aluno } from "src/modules/aluno/entities/aluno.entity"
import { Paciente } from "src/modules/paciente/entites/paciente.entity"

export enum UserType {
    PACIENTE = 'paciente',
    ALUNO = 'aluno'
}

export type UserEntityMap = {
    [UserType.ALUNO]: Aluno
    [UserType.PACIENTE]: Paciente
} & Record<string, IAuthenticatable>;

export interface IAuthenticatable {
    uuid: string
    senha: string
}

export interface IAuthService {
    findById(id: string): Promise<any>
}

export abstract class BaseUser implements IAuthenticatable {
    uuid: string;

    @Exclude({ toPlainOnly: true })
    senha: string;
}