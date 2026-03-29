import { LOCAL_SESSAO, PRONTUARIO_STATUS, TIPO_SESSAO } from "@prisma/client/enums";
import { Aluno } from "src/modules/aluno/entities/aluno.entity";
import { Paciente } from "src/modules/paciente/entites/paciente.entity";

export class Prontuario {
    uuid: string;
    paciente_id?: string | null;
    aluno_id?: string | null
    data_hora: Date;
    // @example: 60
    duracao_minutos: number;
    tipo_sessao: TIPO_SESSAO;
    local: LOCAL_SESSAO;
    status: PRONTUARIO_STATUS;
    observacoes: string;
    criadoEm: Date
    atualizadoEm: Date

    paciente?: Paciente | null
    aluno?: Aluno | null
}