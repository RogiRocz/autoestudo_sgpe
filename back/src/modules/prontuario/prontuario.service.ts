import { PrismaService } from "src/common/Prisma/prisma.service";
import { CreateProntuarioDTO } from "./dto/create-prontuario.dto";
import { Prontuario } from "./entites/prontuario.entity";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { LOCAL_SESSAO, Prisma, PRONTUARIO_STATUS } from "@prisma/client";
import { UpdateProntuarioDTO } from "./dto/update-prontuario.dto";
import { QueryParamsDTO } from "src/common/dto/QueryParams.dto";
import { createPagination, getPaginationPrisma } from "src/common/utils/PrismaQuery.helper";
import { PacienteService } from "../paciente/paciente.service";
import { SearchTimeDTO } from "src/common/dto/SearchTime.dto";
import { AlunoService } from "../aluno/aluno.service";
import { OwnerDataDTO } from "src/common/dto/OwnerData.dto";
import { PaginatedResponse } from "src/common/dto/PaginatedResponse.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProntuarioService {
    constructor(private prisma: PrismaService,
        private pacienteService: PacienteService,
        private alunoService: AlunoService) { }

    async create(dadosProntuario: CreateProntuarioDTO): Promise<Prontuario> {
        const novoProntuario = await this.prisma.prontuario.create({
            data: dadosProntuario,
            include: {
                aluno: true,
                paciente: true
            }
        })

        return novoProntuario
    }

    async findAllProntuarios(params: QueryParamsDTO): Promise<PaginatedResponse<Prontuario>> {
        const skip = params.size * (params.page - 1)
        const total_records = await this.prisma.prontuario.count()

        if (skip >= total_records) {
            throw new BadRequestException('Valor na paginação: O valor recebido está inválido')
        }

        const query = await this.prisma.prontuario.findMany(
            getPaginationPrisma(params)
        )

        const instancias = plainToInstance(Prontuario, query)

        return createPagination(instancias, total_records, params)
    }

    async findByPaciente(id_paciente: string, params: QueryParamsDTO): Promise<PaginatedResponse<Prontuario>> {
        const paciente = await this.pacienteService.findById(id_paciente)
        const total_records = await this.prisma.prontuario.count({
            where: {
                paciente_id: id_paciente
            }
        })

        const query = await this.prisma.prontuario.findMany({
            where: {
                paciente_id: paciente.uuid
            },
            ...getPaginationPrisma(params),
        })

        const instancias = plainToInstance(Prontuario, query)

        return createPagination(instancias, total_records, params)
    }

    async findByAluno(id_aluno: string, params: QueryParamsDTO): Promise<PaginatedResponse<Prontuario>> {
        const aluno = await this.alunoService.findById(id_aluno)
        const total_records = await this.prisma.prontuario.count({
            where: {
                aluno_id: id_aluno
            }
        })

        const query = await this.prisma.prontuario.findMany({
            where: {
                aluno_id: aluno.uuid
            },
            ...getPaginationPrisma(params)
        })

        const instancias = plainToInstance(Prontuario, query)

        return createPagination(instancias, total_records, params)
    }

    async findByLocal(local: LOCAL_SESSAO, params: QueryParamsDTO, owner?: OwnerDataDTO): Promise<PaginatedResponse<Prontuario>> {
        const whereClause: Prisma.prontuarioWhereInput = { local }

        if (owner?.tipoDono && owner?.donoId) {
            whereClause[owner?.tipoDono as string] = owner?.donoId
        }

        const total_records = await this.prisma.prontuario.count({
            where: whereClause
        })

        const query = await this.prisma.prontuario.findMany({
            where: whereClause,
            ...getPaginationPrisma(params)
        })

        const instancias = plainToInstance(Prontuario, query)

        return createPagination(instancias, total_records, params)
    }

    async findByIntervaloTempo(search: SearchTimeDTO, params: QueryParamsDTO): Promise<PaginatedResponse<Prontuario>> {
        const whereClause: Prisma.prontuarioWhereInput = {}

        if (search.tipoDono && search.donoId) {
            whereClause[search.tipoDono as string] = search.donoId
        }

        whereClause.data_hora = {
            gte: search.startDate ? new Date(search.startDate) : undefined,
            lte: search.endDate ? new Date(search.endDate) : undefined
        }

        const total_records = await this.prisma.prontuario.count({
            where: whereClause
        })

        const query = await this.prisma.prontuario.findMany({
            where: whereClause,
            ...getPaginationPrisma(params)
        })

        const instancias = plainToInstance(Prontuario, query)

        return createPagination(instancias, total_records, params)
    }

    async findByStatus(status: PRONTUARIO_STATUS, params: QueryParamsDTO, owner?: OwnerDataDTO): Promise<PaginatedResponse<Prontuario>> {
        const whereClause: Prisma.prontuarioWhereInput = { status }

        if (owner?.tipoDono && owner?.donoId) {
            whereClause[owner?.tipoDono as string] = owner?.donoId
        }

        const total_records = await this.prisma.prontuario.count({
            where: whereClause
        })

        const query = await this.prisma.prontuario.findMany({
            where: whereClause,
            ...getPaginationPrisma(params)
        })

        const instancias = plainToInstance(Prontuario, query)

        return createPagination(instancias, total_records, params)
    }

    async findByID(uuid: string): Promise<Prontuario> {
        try {
            const query = await this.prisma.prontuario.findUniqueOrThrow({
                where: {
                    uuid: uuid
                }
            })

            return query
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new NotFoundException('Valor inválido: Prontuário não encontrado')
                }
            }

            throw error
        }
    }

    async update(id: string, dadosNovos: UpdateProntuarioDTO): Promise<Prontuario> {
        try {
            const prontuarioAntigo = await this.findByID(id)

            if (prontuarioAntigo.paciente_id != dadosNovos.paciente_id) {
                throw new ConflictException('Falha ao atualizar: O prontuário não pode ser mudado de paciente')
            }

            if (prontuarioAntigo.aluno_id != dadosNovos.aluno_id) {
                throw new ConflictException('Falha ao atualizar: O prontuário não pode ser mudado de aluno')
            }

            const query = await this.prisma.prontuario.update({
                where: { uuid: id },
                data: dadosNovos
            })

            return query
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code == 'P2025') {
                    throw new NotFoundException('Valor inválido: Prontuário não encontrado')
                }
            }

            throw error
        }
    }

    async delete(id: string): Promise<object> {
        try {
            const prontuarioDeletado = await this.prisma.prontuario.delete({
                where: { uuid: id },
                select: {
                    uuid: true,
                    data_hora: true,
                    aluno_id: true,
                    paciente_id: true
                }
            })

            return prontuarioDeletado
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code == 'P2025') {
                    throw new NotFoundException('Valor inválido: Prontuário não encontrado')
                }
            }

            throw error
        }
    }
}