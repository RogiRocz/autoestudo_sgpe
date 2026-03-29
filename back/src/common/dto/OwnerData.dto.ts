import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsUUID } from "class-validator";

export enum TipoDono {
    PACIENTE = 'paciente_id',
    ALUNO = 'aluno_id'
}

export class OwnerDataDTO {
    @ApiProperty({ enum: TipoDono, description: 'Tipo de entidade dona do prontuário' })
    @IsOptional()
    @IsEnum(TipoDono, { message: 'Tipo de dono inválido' })
    tipoDono?: TipoDono;

    @ApiProperty({ description: 'UUID do Paciente ou Aluno' })
    @IsOptional()
    @IsUUID()
    donoId?: string;
}