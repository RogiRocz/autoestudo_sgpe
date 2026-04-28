import { UserType } from '@common/interfaces/IAuth.interface'
import { AlunoViewDTO } from '@modules/aluno/dto/alunoView.dto'
import { PacienteViewDTO } from '@modules/paciente/dto/pacienteView.dto'
import { ApiProperty, getSchemaPath } from '@nestjs/swagger'

export class AuthResponseDTO {
    @ApiProperty({
        description: 'token assinado com informações básicas sobre o usuário',
    })
    token: string

    @ApiProperty({
        description: 'Dados do usuário',
        oneOf: [
            { $ref: getSchemaPath(AlunoViewDTO) },
            { $ref: getSchemaPath(PacienteViewDTO) },
        ],
        discriminator: {
            propertyName: 'type',
            mapping: {
                [UserType.ALUNO]: getSchemaPath(AlunoViewDTO),
                [UserType.PACIENTE]: getSchemaPath(PacienteViewDTO),
            },
        },
    })
    user: AlunoViewDTO | PacienteViewDTO
}
