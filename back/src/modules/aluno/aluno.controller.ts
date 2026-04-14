import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from "@nestjs/common";
import { QueryParamsDTO } from "@common/dto/QueryParams.dto";
import { AlunoService } from "./aluno.service";
import { CreateAlunoDTO } from "./dto/create-aluno.dto";
import { UpdateAlunoDTO } from "./dto/update-aluno.dto";
import { Aluno } from "./entities/aluno.entity";
import { ApiTags } from "@nestjs/swagger";
import { PaginatedResponse } from "@common/dto/PaginatedResponse.dto";
import { ApiPaginatedResponse } from "@common/decorator/paginated.decorator";

@ApiTags('alunos')
@Controller('alunos')
export class AlunoController {
    constructor(private alunoService: AlunoService) { }

    @Post()
    async create(@Body() alunoNovo: CreateAlunoDTO): Promise<Aluno> {
        return this.alunoService.create(alunoNovo);
    }

    @Get()
    @ApiPaginatedResponse(Aluno)
    async findAll(@Query() params: QueryParamsDTO): Promise<PaginatedResponse<Aluno>> {
        return this.alunoService.findAll(params);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Aluno> {
        return this.alunoService.findById(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dadosNovos: UpdateAlunoDTO): Promise<Aluno> {
        return this.alunoService.update(id, dadosNovos);
    }

    @Patch('/desativar/:id')
    @HttpCode(204)
    async deactivate(@Param('id') id: string): Promise<void>{
        await this.alunoService.deactivate(id)
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.alunoService.delete(id);
    }

}