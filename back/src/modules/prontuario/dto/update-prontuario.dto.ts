/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from "@nestjs/swagger";
import { CreateProntuarioDTO } from "./create-prontuario.dto";

export class UpdateProntuarioDTO extends PartialType(CreateProntuarioDTO) { }