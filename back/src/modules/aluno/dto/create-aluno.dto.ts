import { ApiProperty } from "@nestjs/swagger";
import { PAPEIS } from "@prisma/client/enums";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAlunoDTO {
    @ApiProperty({example: '235689', description: 'Matrícula institucional do aluno'})
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @MinLength(6)
    @MaxLength(6)
    @IsString()
    matricula: string;

    @ApiProperty({ example: 'João Silva', description: 'Nome completo do aluno' })
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsString()
    nome: string;

    @ApiProperty({example: 'aluno@example.com', description: 'Email utilizado pelo aluno'})
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEmail()
    email: string;

    @ApiProperty({example: 'Senha!123', description: 'Senha plana antes de ser criptografada'})
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsString()
    senha: string;

    @ApiProperty({example: '10', description: 'Número do semestre atual do aluno'})
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsNumber()
    periodo: number;

    @ApiProperty({example: 'ALUNO', description: 'Papel atribuido que define as permissões de acesso'})
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEnum(PAPEIS, {message: 'Papel inválido'})
    papel: PAPEIS

    @ApiProperty({example: 'true', description: 'Define se o aluno tem acesso ao sistema'})
    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsBoolean()
    ativo: boolean
}