import { Aluno } from "@/types/aluno/aluno.interface"
import { UpdateAlunoDTO } from "@/types/aluno/aluno.dto"
import { createBaseService } from "../shared/baseService"

const routeName = 'alunos'

const baseMethods = createBaseService<Aluno, UpdateAlunoDTO>(routeName)

export const AlunoService = {
    ...baseMethods
}