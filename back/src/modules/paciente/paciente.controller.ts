import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { PacienteService } from "./paciente.service";
import { Paciente } from "./entites/paciente.entity";
import { CreatePacienteDTO } from "./dto/create-paciente.dto";
import { IsPositive } from "src/common/validation.pipe";
import { UpdatePacienteDTO } from "./dto/update-paciente.dto";


@Controller('pacientes')
export class PacienteController {
    constructor(private pacienteService: PacienteService) { }

    @Post()
    async createPaciente(@Body() dadosPaciente: CreatePacienteDTO): Promise<Paciente> {
        return await this.pacienteService.create(dadosPaciente)
    }

    @Get()
    async findAllPacientes(@Query('size', IsPositive) size: number = 10, @Query('page', IsPositive) page: number = 1): Promise<Paciente[]> {
        return await this.pacienteService.findAll(size, page)
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