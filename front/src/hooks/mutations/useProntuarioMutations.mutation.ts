import { ProntuarioService } from "@/api/prontuario/prontuario.api";
import { UpdateProntuarioDTO } from "@/types/prontuario/prontuario.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateProntuario = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateProntuarioDTO }) =>
            ProntuarioService.update(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["prontuarios"] })
            // Aplicar toast de sucesso
        },

        onError: () => {
            // Aplicar toast de falha
        }
    })
}

export const useDeleteProntuario = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id }: { id: string }) => ProntuarioService.deactivate(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['prontuarios'] })
        }
    })
}