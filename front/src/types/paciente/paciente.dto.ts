import { Paciente } from './paciente.interface'

export type CreatePacienteDTO = Omit<
    Paciente,
    'uuid' | 'criadoEm' | 'atualizadoEm' | 'prontuarios'
>
export type UpdatePacienteDTO = Partial<CreatePacienteDTO>
