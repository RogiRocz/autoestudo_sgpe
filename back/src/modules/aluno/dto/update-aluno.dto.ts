import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateAlunoDTO } from "./create-aluno.dto";

export class UpdateAlunoDTO extends PartialType(
    OmitType(CreateAlunoDTO, ['senha'] as const)
) {}