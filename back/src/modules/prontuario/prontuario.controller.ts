import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateProntuarioDTO } from "./dto/create-prontuario.dto";
import { Prontuario } from "./entites/prontuario.entity";
import { ProntuarioService } from "./prontuario.service";
import { UpdateProntuarioDTO } from "./dto/update-prontuario.dto";
import { ApiTags } from "@nestjs/swagger";
import { QueryParamsDTO } from "src/common/dto/QueryParams.dto";
import { LOCAL_SESSAO, PRONTUARIO_STATUS } from "@prisma/client";
import { SearchTimeDTO } from "src/common/dto/SearchTime.dto";

@ApiTags('prontuarios')
@Controller('prontuarios')
export class ProntuarioController {
    constructor(private prontuarioService: ProntuarioService) { }

    @Post()
    async createProntuario(@Body() novoProntuario: CreateProntuarioDTO): Promise<Prontuario> {
        return await this.prontuarioService.create(novoProntuario)
    }

    @Get()
    async findAllProntuarios(@Query() params: QueryParamsDTO): Promise<Prontuario[]> {
        return await this.prontuarioService.findAllProntuarios(params)
    }

    @Get('paciente/:id')
    async findByPaciente(@Param('id') id: string, @Query() params: QueryParamsDTO): Promise<Prontuario[]>{
        return await this.prontuarioService.findByPaciente(id, params)
    }

    @Get('aluno/:id')
    async findByAluno(@Param('id') id: string, @Query() params: QueryParamsDTO): Promise<Prontuario[]> {
        return await this.prontuarioService.findByAluno(id, params)
    }

    @Get('local/:local')
    async findByLocal(@Param('local') local: LOCAL_SESSAO, @Query() params: QueryParamsDTO): Promise<Prontuario[]> {
        return await this.prontuarioService.findByLocal(local, params)
    }

    @Get('status/:status')
    async findByStatus(@Param('status') status: PRONTUARIO_STATUS, @Query() params: QueryParamsDTO): Promise<Prontuario[]> {
        return await this.prontuarioService.findByStatus(status, params)
    }

    @Get('datas')
    async findByIntervaloTempo(@Query() search: SearchTimeDTO, @Query() params: QueryParamsDTO): Promise<Prontuario[]> {
        return await this.prontuarioService.findByIntervaloTempo(search, params)
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