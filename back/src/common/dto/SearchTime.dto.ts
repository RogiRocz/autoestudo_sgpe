import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional, IsUUID } from "class-validator";

export enum TipoDono {
    PACIENTE = 'paciente_id',
    ALUNO = 'aluno_id'
}

export class SearchTimeDTO {
    @ApiProperty({ enum: TipoDono, description: 'Tipo de entidade dona do prontuário' })
    @IsEnum(TipoDono, { message: 'Tipo de dono inválido' })
    tipoDono: TipoDono;

    @ApiProperty({ description: 'UUID do Paciente ou Aluno' })
    @IsUUID()
    donoId: string;

    @ApiProperty({ example: '2023-01-01T00:00:00.000Z', description: 'Data de início do intervalo' })
    @IsOptional()
    @IsDateString()
    startDate: string;

    @ApiProperty({ example: '2023-12-31T23:59:59.999Z', description: 'Data de fim do intervalo' })
    @IsOptional()
    @IsDateString()
    endDate: string;
}