import { PAPEIS } from "@prisma/client/enums";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Aluno } from "../entities/aluno.entity";
import { PickType } from "@nestjs/swagger";

export class CreateAlunoDTO extends PickType(Aluno, [
    'matricula', 'nome', 'email', 'senha', 'periodo', 'papel', 'ativo'
]) {

    @IsNotEmpty({ message: 'Campo obrigatório' })
    @MinLength(6)
    @MaxLength(6)
    @IsString()
    matricula: string;


    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsString()
    nome: string;


    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEmail()
    email: string;


    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsString()
    senha: string;


    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsNumber()
    periodo: number;


    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsEnum(PAPEIS, { message: 'Papel inválido' })
    papel: PAPEIS


    @IsNotEmpty({ message: 'Campo obrigatório' })
    @IsBoolean()
    ativo: boolean
}