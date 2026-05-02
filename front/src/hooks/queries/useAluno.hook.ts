import { AlunoService } from "@/api/aluno/aluno.api"
import { useQuery } from "@tanstack/react-query"
import { useAuthUser } from "./useAuthUser.hook"

const tableKey = 'alunos'

export const useSearchAlunos = (word: string) => {
	const { user, isAuthenticated } = useAuthUser()

	return useQuery({
		queryKey: [tableKey, user?.type, user?.uuid, word],
		queryFn: async () => {
			return AlunoService.search(word)
		},
		enabled: isAuthenticated && word.length > 2,
	})
}