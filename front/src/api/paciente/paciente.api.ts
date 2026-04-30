import { UpdatePacienteDTO } from '@/types/paciente/paciente.dto'
import { Paciente } from '@/types/paciente/paciente.interface'
import { createBaseService } from '../shared/baseService'
import { apiFetch } from '../shared/config'

const routeName = 'pacientes'

const baseMethods = createBaseService<Paciente, UpdatePacienteDTO>(routeName)

export const PacienteService = {
	...baseMethods,
	search: async (word: string): Promise<Paciente[]> => {
		const params = new URLSearchParams({word})
		return apiFetch(`${routeName}/search?${params.toString()}`, {
			method: 'GET'
		})
	}
}
