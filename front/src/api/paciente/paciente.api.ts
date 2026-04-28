import { UpdatePacienteDTO } from "@/types/paciente/paciente.dto"
import { Paciente } from "@/types/paciente/paciente.interface"
import { createBaseService } from "../shared/baseService"

const routeName = "pacientes"

const baseMethods = createBaseService<Paciente, UpdatePacienteDTO>(routeName)

export const PacienteService = {
  ...baseMethods,
}
