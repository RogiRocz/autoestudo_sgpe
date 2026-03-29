import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class QueryParamsDTO {
    @ApiProperty({ example: '1', description: 'Página que deseja acessar' })
    @IsOptional()
    @Min(1)
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : 1))
    page: number = 1;

    @ApiProperty({ example: '10', description: 'Quantidade de itens por página' })
    @IsOptional()
    @Min(1)
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : 10))
    size: number = 10;

    @ApiProperty({ example: 'criadoEm, status, nome', description: 'Campos que deseja ordenar' })
    @IsOptional()
    @IsString()
    sortBy: string = 'criadoEm';

    @ApiProperty({ example: 'ASC', description: 'Ordem crescente ou decrescente' })
    @IsOptional()
    @IsString()
    @IsIn(['ASC', 'DESC'])
    @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.toUpperCase() : value))
    order: 'ASC' | 'DESC' = 'ASC';
}