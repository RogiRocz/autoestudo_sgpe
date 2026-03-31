import { ApiProperty } from "@nestjs/swagger"
import { PAPEIS } from "@prisma/client/enums"
import { Prontuario } from "src/modules/prontuario/entites/prontuario.entity"

export class Aluno {
    @ApiProperty({ example: 'uuid-v4-do-aluno' })
    uuid: string

    @ApiProperty({ example: '235689', description: 'Matrícula institucional do aluno' })
    matricula: string

    @ApiProperty({ example: 'João Silva', description: 'Nome completo do aluno' })
    nome: string

    @ApiProperty({ example: 'aluno@example.com', description: 'Email utilizado pelo aluno' })
    email: string

    @ApiProperty({ example: 'Senha!123', description: 'Senha plana antes de ser criptografada' })
    senha: string

    @ApiProperty({ example: '10', description: 'Número do semestre atual do aluno' })
    periodo: number

    @ApiProperty({ enum: PAPEIS, description: 'Nível de acesso do estagiário', example: PAPEIS.ALUNO })
    papel: PAPEIS

    @ApiProperty({ example: 'true', description: 'Define se o aluno tem acesso ao sistema' })
    ativo: boolean

    @ApiProperty({ description: 'Data de criação do registro do aluno' })
    criadoEm: Date

    @ApiProperty({ description: 'Data da atualização de alguma informação do aluno' })
    atualizadoEm: Date

    @ApiProperty({ type: () => [Prontuario], isArray: true, required: false, description: 'Prontuários de responsabilidade do aluno' })
    prontuarios?: Prontuario[]
}