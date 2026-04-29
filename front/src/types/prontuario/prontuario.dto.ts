import { Prontuario } from './prontuario.interface'

export type CreateProntuarioDTO = Omit<
    Prontuario,
    'uuid' | 'criadoEm' | 'atualizadoEm' | 'paciente' | 'aluno'
>
export type UpdateProntuarioDTO = Partial<CreateProntuarioDTO>
