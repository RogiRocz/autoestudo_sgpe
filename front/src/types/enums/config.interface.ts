import {
    PAPEIS,
    CLIENTE_PRONTUARIO_STATUS,
    TIPO_SESSAO,
    LOCAL_SESSAO,
    PRONTUARIO_STATUS,
    TIPO_USUARIO,
} from '@/types/enums/enums'

export interface SystemEnumsResponse {
    papeis: string[]
    statusProntuario: string[]
    tiposSessao: string[]
    locaisSessao: string[]
    prontuarioStatus: string[]
    tiposUsuario: string[]
}
