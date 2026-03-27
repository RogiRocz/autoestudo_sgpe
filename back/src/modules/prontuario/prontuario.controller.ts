import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateProntuarioDTO } from "./dto/create-prontuario.dto";
import { Prontuario } from "./entites/prontuario.entity";
import { ProntuarioService } from "./prontuario.service";
import { IsPositive } from "src/common/validation.pipe";
import { UpdateProntuarioDTO } from "./dto/update-prontuario.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('prontuarios')
@Controller('prontuarios')
export class ProntuarioController {
    constructor(private prontuarioService: ProntuarioService) { }

    @Post()
    async createProntuario(@Body() novoProntuario: CreateProntuarioDTO): Promise<Prontuario> {
        return await this.prontuarioService.create(novoProntuario)
    }

    @Get()
    async findAllProntuarios(@Query('size', IsPositive) size: number = 10, @Query('page', IsPositive) page: number = 1): Promise<Prontuario[]> {
        return await this.prontuarioService.findAllProntuarios(size, page)
    }

    @Get(':id')
    async findProntuario(@Param('id') id: string): Promise<Prontuario> {
        return await this.prontuarioService.findByID(id)
    }

    @Patch(':id')
    async updateProntuario(@Param('id') id: string, @Body() dadosNovos: UpdateProntuarioDTO): Promise<Prontuario> {
        return await this.prontuarioService.update(id, dadosNovos)
    }

    @Delete(':id')
    async deleteProntuario(@Param('id') id: string): Promise<object> {
        return await this.prontuarioService.delete(id)
    }
}