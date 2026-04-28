import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEnum, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator'

export enum ORDER {
    ASC = 'asc',
    DESC = 'desc',
}

export class QueryParamsDTO {
    @ApiProperty({ example: '1', description: 'Página que deseja acessar' })
    @IsOptional()
    @Min(1)
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : 1))
    page: number = 1

    @ApiProperty({
        example: '10',
        description: 'Quantidade de itens por página',
    })
    @IsOptional()
    @Min(1)
    @IsInt()
    @Transform(({ value }) => (value ? parseInt(value, 10) : 10))
    size: number = 10

    @ApiProperty({
        example: 'criadoEm, status, nome',
        description: 'Campo que deseja ordenar',
    })
    @IsOptional()
    @IsString()
    sortBy: string = 'criadoEm'

    @ApiProperty({
        enum: ORDER,
        enumName: 'ORDEM',
        example: 'asc',
        description: 'Ordem crescente ou decrescente',
        default: ORDER.ASC,
    })
    @IsEnum(ORDER)
    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
    @Transform(({ value }): string | undefined =>
        typeof value === 'string' ? value.toLowerCase() : value
    )
    order: ORDER = ORDER.ASC
}
