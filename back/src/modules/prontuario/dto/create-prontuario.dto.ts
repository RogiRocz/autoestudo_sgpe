/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { LOCAL_SESSAO, PRONTUARIO_STATUS, TIPO_SESSAO } from "@prisma/client/enums";
import { Prontuario } from "../entites/prontuario.entity";
import { Type } from "class-transformer";

export class CreateProntuarioDTO extends PickType(Prontuario, [
    'paciente_id', 'aluno_id', 'data_hora', 'duracao_minutos',
    'tipo_sessao', 'local', 'status', 'observacoes'
]) {
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsUUID('4', { message: 'Deve ser um UUID válido' })
    paciente_id: string;

    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsUUID('4', { message: 'Deve ser um UUID válido' })
    aluno_id: string;

    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsDateString()
    @Type(() => Date)
    @IsDate()
    data_hora: Date;

    @IsOptional()
    @IsInt()
    duracao_minutos: number;

    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEnum(TIPO_SESSAO, { message: 'Tipo de sessão inválida' })
    tipo_sessao: TIPO_SESSAO;

    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEnum(LOCAL_SESSAO, { message: 'Local inválido' })
    local: LOCAL_SESSAO;

    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEnum(PRONTUARIO_STATUS, { message: 'Status do prontuário do cliente inválido' })
    status: PRONTUARIO_STATUS;

    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsString()
    observacoes: string;
}