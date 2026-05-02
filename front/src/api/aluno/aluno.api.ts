import { Aluno } from '@/types/aluno/aluno.interface'
import { UpdateAlunoDTO } from '@/types/aluno/aluno.dto'
import { createBaseService } from '../shared/baseService'
import { apiFetch } from '../shared/config'

const routeName = 'alunos'

const baseMethods = createBaseService<Aluno, UpdateAlunoDTO>(routeName)

export const AlunoService = {
	...baseMethods,
	search: async (word: string): Promise<Aluno[]> => {
		const params = new URLSearchParams({ word })
		return apiFetch(`${routeName}/search?${params.toString()}`, {
			method: 'GET',
		})
	},
}
