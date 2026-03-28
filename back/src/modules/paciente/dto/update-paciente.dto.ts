import { PartialType } from "@nestjs/swagger";
import { CreatePacienteDTO } from "./create-paciente.dto";

export class UpdatePacienteDTO extends PartialType(CreatePacienteDTO) { }