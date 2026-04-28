import { PAPEIS } from "../enums/enums"
import { Prontuario } from "../prontuario/prontuario.interface"

export interface Aluno {
  uuid: string
  matricula: string
  nome: string
  email: string
  senha: string
  periodo: number
  papel: PAPEIS
  ativo: boolean

  criadoEm: Date
  atualizadoEm: Date

  prontuarios?: Prontuario[]
}
