import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common'
import { PacienteService } from './paciente.service'
import { Paciente } from './entites/paciente.entity'
import { CreatePacienteDTO } from './dto/create-paciente.dto'
import { UpdatePacienteDTO } from './dto/update-paciente.dto'
import { ApiTags } from '@nestjs/swagger'
import { QueryParamsDTO } from '@common/dto/QueryParams.dto'
import { PaginatedResponse } from '@common/dto/PaginatedResponse.dto'
import { ApiPaginatedResponse } from '@common/decorator/paginated.decorator'

@ApiTags('pacientes')
@Controller('pacientes')
export class PacienteController {
	constructor(private pacienteService: PacienteService) { }

	@Post()
	async createPaciente(
		@Body() dadosPaciente: CreatePacienteDTO
	): Promise<Paciente> {
		return await this.pacienteService.create(dadosPaciente)
	}

	@Get('search/:word')
	async searchPacientes(@Param('word') word: string): Promise<Paciente[]> {
		return await this.pacienteService.search(word)
	}

	@Get()
	@ApiPaginatedResponse(Paciente)
	async findAllPacientes(
		@Query() params: QueryParamsDTO
	): Promise<PaginatedResponse<Paciente>> {
		return await this.pacienteService.findAll(params)
	}

	@Get(':id')
	async findPacienteById(@Param('id') id: string): Promise<Paciente> {
		return this.pacienteService.findById(id)
	}

	@Patch(':id')
	async updatePaciente(
		@Param('id') id: string,
		@Body() dadosNovos: UpdatePacienteDTO
	): Promise<Paciente> {
		return this.pacienteService.update(id, dadosNovos)
	}

	@Patch('/desativar/:id')
	@HttpCode(204)
	async deactivate(@Param('id') id: string): Promise<void> {
		await this.pacienteService.deactivate(id)
	}

	@Delete(':id')
	async deletePaciente(@Param('id') id: string): Promise<object> {
		return this.pacienteService.delete(id)
	}
}
