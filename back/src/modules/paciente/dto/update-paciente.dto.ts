import { CLIENTE_PRONTUARIO_STATUS } from "@prisma/client/enums";
import { IsDateString, IsEnum, IsOptional, IsString, Length } from "class-validator";

export class updatePacienteDTO {
    @IsOptional()
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
    cpf: string;

    @IsOptional()
    @IsDateString()
    data_nascimento: Date;

    @IsOptional()
    @IsEnum(CLIENTE_PRONTUARIO_STATUS, { message: 'Status do prontuário inválido' })
    prontuario_status: CLIENTE_PRONTUARIO_STATUS;
}