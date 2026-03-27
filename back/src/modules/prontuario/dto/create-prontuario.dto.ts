/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { LOCAL_SESSAO, PRONTUARIO_STATUS, TIPO_SESSAO } from "orm/generated/prisma/enums";

export class CreateProntuarioDTO {
    @ApiProperty({ example: 'uuid-do-paciente', description: 'ID único do paciente vinculado' })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsUUID('4', { message: 'Deve ser um UUID válido' })
    id_paciente: string;

    @ApiProperty({ example: '2026-03-27T14:00:00Z', description: 'Data e hora da sessão' })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsDateString()
    data_hora: Date;

    @ApiProperty({ example: 60, required: false, default: 60 })
    @IsOptional()
    @IsInt()
    duracao_minutos: number;

    @ApiProperty({ enum: TIPO_SESSAO, example: TIPO_SESSAO.INDIVIDUAL })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEnum(TIPO_SESSAO, { message: 'Tipo de sessão inválida' })
    tipo_sessao: TIPO_SESSAO;

    @ApiProperty({ enum: LOCAL_SESSAO, example: LOCAL_SESSAO.SALA_01 })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEnum(LOCAL_SESSAO, { message: 'Local inválido' })
    local: LOCAL_SESSAO;

    @ApiProperty({ enum: PRONTUARIO_STATUS, example: PRONTUARIO_STATUS.REALIZADO })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEnum(PRONTUARIO_STATUS, { message: 'Status do prontuário do cliente inválido' })
    status: PRONTUARIO_STATUS;

    @ApiProperty({ example: 'Paciente apresentou evolução no quadro...', description: 'Notas da sessão' })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsString()
    observacoes: string;
}