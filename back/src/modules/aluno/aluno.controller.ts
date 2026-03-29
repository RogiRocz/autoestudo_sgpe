import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { QueryParamsDTO } from "src/common/dto/QueryParams.dto";
import { AlunoService } from "./aluno.service";
import { CreateAlunoDTO } from "./dto/create-aluno.dto";
import { UpdateAlunoDTO } from "./dto/update-aluno.dto";
import { Aluno } from "./entities/aluno.entity";

@Controller('aluno')
export class AlunoController{
    constructor(private alunoService: AlunoService) { }

    @Post()
    async create(@Body() alunoNovo: CreateAlunoDTO): Promise<Aluno> {
        return this.alunoService.create(alunoNovo);
    }

    @Get()
    async findAll(@Query() params: QueryParamsDTO): Promise<Aluno[]> {
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

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.alunoService.delete(id);
    }

}