import { UserType } from '@common/interfaces/IAuth.interface'
import { Aluno } from '../entities/aluno.entity'
import { ApiProperty, OmitType } from '@nestjs/swagger'

export class AlunoViewDTO extends OmitType(Aluno, ['senha']) {
    @ApiProperty({
        enum: UserType,
        enumName: 'UserType',
        example: UserType.ALUNO,
    })
    type: UserType.ALUNO
}
