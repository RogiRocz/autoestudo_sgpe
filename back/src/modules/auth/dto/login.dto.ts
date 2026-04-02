import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { UserType } from "src/common/interfaces/IAuth.interface";

export enum Fields {
    CPF,
    EMAIL,
    MATRICULA
}

export class LoginDTO {
    @ApiProperty({ example: '12345678901', description: 'CPF ou Matrícula de 6 digítos' })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({ example: 'senha!123', format: 'Senha de login' })
    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsOptional()
    @ApiProperty({enum: Fields, enumName: 'FIELDS', example: Fields.EMAIL, description: 'Qual campo vai ser validado para login'})
    field?: Fields

    @ApiProperty({ enum: UserType, enumName: 'USER_TYPE', example: UserType.ALUNO, description: 'Qual tipo de usuário quer logar' })
    @IsEnum(UserType)
    type: UserType;
}