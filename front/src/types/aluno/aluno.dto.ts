import { Aluno } from './aluno.interface'

export type CreateAlunoDTO = Omit<
    Aluno,
    'uuid' | 'criadoEm' | 'atualizadoEm' | 'prontuarios'
>
export type UpdateAlunoDTO = Partial<CreateAlunoDTO>
