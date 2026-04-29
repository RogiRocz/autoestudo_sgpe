import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Public } from '@common/decorator/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('config')
@Controller('config')
export class ConfigController {
    constructor(private readonly configService: ConfigService) { }

    @Get('enums')
    @ApiOperation({
        summary: 'Retorna todos os Enums do sistema',
        description: 'Esta rota fornece os valores de Enums (Papeis, Status, Salas, etc.) definidos no Schema do Prisma. Útil para preencher Selects e Checkboxes no Frontend sem duplicar código.'
    })
    getEnums() {
        return this.configService.getEnums();
    }
}