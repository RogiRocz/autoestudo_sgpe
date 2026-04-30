import { QueryParams } from "@/types/shared/pagination";
import { useAuthUser } from "./useAuthUser.hook";
import { useQuery } from "@tanstack/react-query";
import { PacienteService } from "@/api/paciente/paciente.api";

const tableKey = 'pacientes'

export const searchPacientes = (word: string) => {
	const { user, isAuthenticated } = useAuthUser()

	return useQuery({
		queryKey: [tableKey, user?.type, user?.uuid, word],
		queryFn: async () => {
			return PacienteService.search(word)
		},
		enabled: isAuthenticated && word.length > 2
	})
}