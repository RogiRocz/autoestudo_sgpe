/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { CLIENTE_PRONTUARIO_STATUS } from "orm/generated/prisma/enums";

export class CreatePacienteDTO {
    @ApiProperty({ example: 'João Silva', description: 'Nome completo do paciente' })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsString()
    nome: string;

    @ApiProperty({ example: '12345678901', description: 'CPF (apenas 11 números)' })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsString()
    @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
    cpf: string;

    @ApiProperty({ example: '12/12/2012', description: 'Data de nascimento em formato ISO' })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsDateString()
    data_nascimento: Date;

    @ApiProperty({ enum: CLIENTE_PRONTUARIO_STATUS, example: CLIENTE_PRONTUARIO_STATUS.ATIVO })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEnum(CLIENTE_PRONTUARIO_STATUS, { message: 'Status do prontuário inválido' })
    prontuario_status: CLIENTE_PRONTUARIO_STATUS;
}