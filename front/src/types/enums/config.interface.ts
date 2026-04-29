import {
    PAPEIS,
    CLIENTE_PRONTUARIO_STATUS,
    TIPO_SESSAO,
    LOCAL_SESSAO,
    PRONTUARIO_STATUS,
    TIPO_USUARIO
} from "@/types/enums/enums"

export interface SystemEnumsResponse {
    papeis: PAPEIS[]
    clienteProntuarioStatus: CLIENTE_PRONTUARIO_STATUS[]
    tiposSessao: TIPO_SESSAO[]
    locaisSessao: LOCAL_SESSAO[]
    prontuarioStatus: PRONTUARIO_STATUS[]
    tiposUsuario: TIPO_USUARIO[]
}