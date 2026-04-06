import { UserType } from "@common/interfaces/IAuth.interface";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Paciente } from "../entites/paciente.entity";

export class PacienteViewDTO extends OmitType(Paciente, ['senha']) {
    @ApiProperty({ enum: UserType, enumName: 'UserType', example: UserType.PACIENTE })
    type: UserType.PACIENTE
}