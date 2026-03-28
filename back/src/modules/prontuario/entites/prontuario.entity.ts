import { LOCAL_SESSAO, PRONTUARIO_STATUS, TIPO_SESSAO } from "orm/generated/prisma/enums";

export class Prontuario {
    uuid: string;
    paciente_id: string;
    data_hora: Date;
    // @example: 60
    duracao_minutos: number;
    tipo_sessao: TIPO_SESSAO;
    local: LOCAL_SESSAO;
    status: PRONTUARIO_STATUS;
    observacoes: string;
}