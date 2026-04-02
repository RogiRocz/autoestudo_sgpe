import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";
import { UserType } from "@common/interfaces/IAuth.interface";
import { CreateAlunoDTO } from "@modules/aluno/dto/create-aluno.dto";
import { CreatePacienteDTO } from "@modules/paciente/dto/create-paciente.dto";

export class RegisterDTO {
    @ApiProperty({ enum: UserType })
    @IsEnum(UserType)
    type: UserType;

    @ApiProperty({
        description: 'Dados específicos do usuário',
        oneOf: [
            { $ref: getSchemaPath(CreateAlunoDTO) },
            { $ref: getSchemaPath(CreatePacienteDTO) },
        ],
        discriminator: {
            propertyName: 'type',
            mapping: {
                [UserType.ALUNO]: getSchemaPath(CreateAlunoDTO),
                [UserType.PACIENTE]: getSchemaPath(CreatePacienteDTO)
            }
        }
    })
    @ValidateNested()
    @Type((opts) => {
        const type = opts?.object?.type;
        if (type === UserType.ALUNO) return CreateAlunoDTO;
        if (type === UserType.PACIENTE) return CreatePacienteDTO;
        return Object;
    })
    userData: CreateAlunoDTO | CreatePacienteDTO;
}