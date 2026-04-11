import { CLIENTE_PRONTUARIO_STATUS } from '@/types/enums/enums'
import { Prontuario } from '../prontuario/prontuario.interface'

export interface Paciente {
    uuid?: string
    nome: string
    cpf: string
    senha: string
    data_nascimento: Date;
    prontuario_status: CLIENTE_PRONTUARIO_STATUS;

    criadoEm: Date
    atualizadoEm: Date

    prontuarios?: Prontuario[]
}