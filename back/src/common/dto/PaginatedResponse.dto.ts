import { ApiProperty } from "@nestjs/swagger";

class PaginationMetadata {
    @ApiProperty({description: 'Página atual'})
    page: number;
    @ApiProperty({description: 'Tamanho da página'})
    size: number;
    @ApiProperty({description: 'Total de páginas'})
    totalPages: number;
    @ApiProperty({description: 'Total de itens'})
    totalItems: number;
}

export class PaginatedResponse<E> {
    @ApiProperty({description: 'Metadados sobre a paginação'})
    metadata: PaginationMetadata;

    @ApiProperty({
        description: 'Lista de registros encontrados',
        type: 'array',
        items: {
            oneOf: [
                { $ref: 'Paciente' },
                { $ref: 'Aluno' },
                { $ref: 'Prontuario' },
            ],
        },
    })
    data: E[];
}