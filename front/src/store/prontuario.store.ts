import { Prontuario } from "@/types/prontuario/prontuario.interface"
import { PaginationMetadata } from "@/types/shared/pagination"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ProntuarioState {
    metadata: PaginationMetadata | null
    prontuarios: Prontuario[] | null
    setMetadata: (newMetadata: PaginationMetadata) => void
    setProntuarios: (newProntuarios: Prontuario[]) => void
}

export const prontuariosStore = create<ProntuarioState>()(
    persist(
        (set) => ({
            metadata: null,
            prontuarios: null,
            setMetadata: (newMetadata: PaginationMetadata) => set(() => ({ metadata: newMetadata })),
            setProntuarios: (newProntuarios: Prontuario[]) => set(() => ({ prontuarios: newProntuarios }))
        }), { name: 'prontuarios' }
    )
)