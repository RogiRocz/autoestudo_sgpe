import { LOCAL_SESSAO, PRONTUARIO_STATUS, TIPO_SESSAO } from "orm/generated/prisma/enums";

export class Prontuario {
    uuid: string;
    id_paciente: string | null;
    data_hora: Date;
    // @example: 60
    duracao_minutos: number;
    tipo_sessao: TIPO_SESSAO;
    local: LOCAL_SESSAO;
    status: PRONTUARIO_STATUS;
    observacoes: string;
}