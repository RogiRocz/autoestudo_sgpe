import { Aluno } from '../aluno/aluno.interface'
import { TIPO_USUARIO } from '../enums/enums'
import { Paciente } from '../paciente/paciente.interface'

export interface User<E> {
    uuid: string
    type: TIPO_USUARIO
    data?: E
}

export type UserAluno = User<Aluno>
export type UserPaciente = User<Paciente>

export type AnyUser = UserAluno | UserPaciente
