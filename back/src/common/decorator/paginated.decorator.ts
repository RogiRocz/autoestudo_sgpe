import { Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { PaginatedResponse } from '../dto/PaginatedResponse.dto'

export const ApiPaginatedResponse = <TModel extends Type<any>>(
    model: TModel
) => {
    return applyDecorators(
        ApiExtraModels(PaginatedResponse, model), // Registra os modelos no Swagger
        ApiOkResponse({
            description: `Lista paginada de ${model.name}`,
            schema: {
                title: `Modelo de paginação de ${model.name}`,
                allOf: [
                    { $ref: getSchemaPath(PaginatedResponse) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        })
    )
}
