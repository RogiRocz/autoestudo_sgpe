import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { PacienteService } from "./paciente.service";
import { Paciente } from "./entites/paciente.entity";
import { CreatePacienteDTO } from "./dto/create-paciente.dto";
import { UpdatePacienteDTO } from "./dto/update-paciente.dto";
import { ApiTags } from "@nestjs/swagger";
import { QueryParamsDTO } from "src/common/dto/QueryParams.dto";

@ApiTags('pacientes')
@Controller('pacientes')
export class PacienteController {
    constructor(private pacienteService: PacienteService) { }

    @Post()
    async createPaciente(@Body() dadosPaciente: CreatePacienteDTO): Promise<Paciente> {
        return await this.pacienteService.create(dadosPaciente)
    }

    @Get()
    async findAllPacientes(@Query() params: QueryParamsDTO): Promise<Paciente[]> {
        return await this.pacienteService.findAll(params)
    }

    @Get(':id')
    async findPacienteById(@Param('id') id: string): Promise<Paciente> {
        return this.pacienteService.findById(id)
    }

    @Patch(':id')
    async updatePaciente(@Param('id') id: string, @Body() dadosNovos: UpdatePacienteDTO): Promise<Paciente> {
        return this.pacienteService.update(id, dadosNovos)
    }

    @Delete(':id')
    async deletePaciente(@Param('id') id: string): Promise<object> {
        return this.pacienteService.delete(id)
    }
}