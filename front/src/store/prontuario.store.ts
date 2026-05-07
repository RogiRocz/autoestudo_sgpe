import { Prontuario } from "@/types/prontuario/prontuario.interface"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ProntuarioState {
    prontuarios: Prontuario[] | null
    setProntuarios: (newProntuarios: Prontuario[]) => void
}

export const prontuariosStore = create<ProntuarioState>()(
    persist(
        (set) => ({
            prontuarios: null,
            setProntuarios: (newProntuarios: Prontuario[]) => set(() => ({ prontuarios: newProntuarios }))
        }), { name: 'prontuarios' }
    )
)