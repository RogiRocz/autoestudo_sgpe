import { LOCAL_SESSAO, PRONTUARIO_STATUS, TIPO_SESSAO } from "../enums/enums"
import { Aluno } from "../aluno/aluno.interface"
import { Paciente } from "../paciente/paciente.interface"

export interface Prontuario {
    uuid: string
    aluno_id: string
    paciente_id: string
    data_hora: Date
    duracao_minutos: number
    tipo_sessao: TIPO_SESSAO
    local: LOCAL_SESSAO
    status: PRONTUARIO_STATUS
    observacoes: string

    criadoEm: Date
    atualizadoEm: Date

    paciente?: Paciente
    aluno?: Aluno
}