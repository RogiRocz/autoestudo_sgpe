/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { LOCAL_SESSAO, PRONTUARIO_STATUS, TIPO_SESSAO } from "orm/generated/prisma/enums";
import { CreateProntuarioDTO } from "./create-prontuario.dto";

export class UpdateProntuarioDTO extends PartialType(CreateProntuarioDTO){
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsUUID('4', { message: 'Deve ser um UUID válido' })
    id_paciente: string;

    @IsOptional()
    @IsDateString()
    data_hora: Date;

    @IsOptional()
    @IsInt()
    duracao_minutos: number;

    @IsOptional()
    @IsEnum(TIPO_SESSAO, { message: 'Tipo de sessão inválida' })
    tipo_sessao: TIPO_SESSAO;

    @IsOptional()
    @IsEnum(LOCAL_SESSAO, { message: 'Local inválido' })
    local: LOCAL_SESSAO;

    @IsOptional()
    @IsEnum(PRONTUARIO_STATUS, { message: 'Status do prontuário do cliente inválido' })
    status: PRONTUARIO_STATUS;

    @IsOptional()
    @IsString()
    observacoes: string;
}