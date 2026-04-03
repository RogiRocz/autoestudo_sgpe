import { CLIENTE_PRONTUARIO_STATUS } from '@/types/enums/enums'
import { Prontuario } from '../prontuario/prontuario.type'

export type Paciente = {
    uuid?: string
    nome: string
    cpf: string
    data_nascimento: Date;
    prontuario_status: CLIENTE_PRONTUARIO_STATUS;

    criadoEm: Date
    atualizadoEm: Date

    prontuarios?: Prontuario[]
}