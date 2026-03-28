import { PAPEIS } from "@prisma/client"
import { Prontuario } from "src/modules/prontuario/entites/prontuario.entity"

export class Aluno {
    uuid: string
    /* A matrícula é composta por 6 números
        @example: 235689
    */
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