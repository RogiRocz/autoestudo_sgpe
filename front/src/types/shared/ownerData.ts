import { TIPO_USUARIO } from "../enums/enums";

export const MAP_TIPO_DONO = {
    [TIPO_USUARIO.ALUNO]: 'aluno_id',
    [TIPO_USUARIO.PACIENTE]: 'paciente_id',
} as const

export interface OwnerData {
    tipoDono: typeof MAP_TIPO_DONO[TIPO_USUARIO],
    donoId: string;
}