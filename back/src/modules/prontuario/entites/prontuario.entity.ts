import { ApiProperty } from "@nestjs/swagger";
import { LOCAL_SESSAO, PRONTUARIO_STATUS, TIPO_SESSAO } from "@prisma/client";
import { Aluno } from "@modules/aluno/entities/aluno.entity";
import { Paciente } from "@modules/paciente/entites/paciente.entity";

export class Prontuario {
    @ApiProperty({ example: 'uuid-v4-do-prontuario' })
    uuid: string;

    @ApiProperty({ example: 'uuid-do-paciente', description: 'ID único do paciente vinculado' })
    paciente_id?: string | null;

    @ApiProperty({ example: 'uuid-do-aluno', description: 'ID único do aluno vinculado' })
    aluno_id?: string | null

    @ApiProperty({ example: '2026-03-27T14:00:00Z', description: 'Data e hora da sessão' })
    data_hora: Date;

    @ApiProperty({ example: 60, required: false, default: 60 })
    duracao_minutos: number;

    @ApiProperty({ enum: TIPO_SESSAO, example: TIPO_SESSAO.INDIVIDUAL, description: 'Tipo de sessão a ser realizada' })
    tipo_sessao: TIPO_SESSAO;

    @ApiProperty({ enum: LOCAL_SESSAO, example: LOCAL_SESSAO.SALA_01, description: 'Local onde a sessão será realizada' })
    local: LOCAL_SESSAO;

    @ApiProperty({ enum: PRONTUARIO_STATUS, example: PRONTUARIO_STATUS.REALIZADO, description: 'Status no prontuário da sessão' })
    status: PRONTUARIO_STATUS;

    @ApiProperty({ example: 'Paciente apresentou evolução no quadro...', description: 'Notas da sessão' })
    observacoes: string;

    @ApiProperty({ description: 'Data de criação do registro do aluno' })
    criadoEm: Date

    @ApiProperty({ description: 'Data da atualização de alguma informação do aluno' })
    atualizadoEm: Date

    @ApiProperty({ type: () => Paciente, nullable: true })
    paciente?: Paciente | null
    @ApiProperty({ type: () => Aluno, nullable: true })
    aluno?: Aluno | null
}