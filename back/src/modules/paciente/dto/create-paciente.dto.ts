/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsDateString, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { CLIENTE_PRONTUARIO_STATUS } from "orm/generated/prisma/enums";

export class CreatePacienteDTO {
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsString()
    nome: string;

    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsString()
    @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
    cpf: string;

    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsDateString()
    data_nascimento: Date;

    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEnum(CLIENTE_PRONTUARIO_STATUS, { message: 'Status do prontuário inválido' })
    prontuario_status: CLIENTE_PRONTUARIO_STATUS;
}