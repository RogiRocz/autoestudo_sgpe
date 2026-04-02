import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/common/Prisma/prisma.service";
import { CreatePacienteDTO } from "./dto/create-paciente.dto";
import { CLIENTE_PRONTUARIO_STATUS } from "@prisma/client/enums";
import { Paciente } from "./entites/paciente.entity";
import { Prisma } from "@prisma/client";
import { UpdatePacienteDTO } from "./dto/update-paciente.dto";
import { QueryParamsDTO } from "src/common/dto/QueryParams.dto";
import { getPaginationPrisma } from "src/common/utils/PrismaQuery.helper";
import { IAuthService } from "src/common/interfaces/IAuth.interface";
import { Fields } from "../auth/dto/login.dto";


@Injectable()
export class PacienteService implements IAuthService {
    constructor(private prisma: PrismaService) { }

    async findById(uuid: string): Promise<Paciente> {
        try {
            const query = await this.prisma.paciente.findUniqueOrThrow({
                where: {
                    uuid: uuid
                }
            })

            return query
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new NotFoundException('Valor inválido: Paciente não encontrado')
                }
            }

            throw error
        }
    }


    async findByIdentifier(login: string, field?: Fields): Promise<Paciente | null> {
        switch (field) {
            case Fields.CPF:
                return this.findByCPF(login)
            default:
                throw new InternalServerErrorException('Falha em busca: Campo para buscar inexistente')
        }
    }


    async findByCPF(cpf: string): Promise<Paciente | null> {

        const query = await this.prisma.paciente.findUnique({
            where: {
                cpf: cpf
            }
        })


        return query
    }

    async findAll(params: QueryParamsDTO): Promise<Paciente[]> {
        const skip = params.size * (params.page - 1)
        const total_records = await this.prisma.paciente.count()

        if (skip >= total_records) {
            throw new BadRequestException('Valor na paginação: O valor recebido está inválido')
        }

        const query = await this.prisma.paciente.findMany(
            getPaginationPrisma(params)
        )

        return query
    }

    async create(dadosPaciente: CreatePacienteDTO): Promise<Paciente> {
        if (await this.findByCPF(dadosPaciente.cpf)) {
            throw new ConflictException('Falha ao Registrar: Paciente já cadastrado')
        }

        const novoPaciente = await this.prisma.paciente.create({
            data: dadosPaciente
        })

        return novoPaciente;
    }

    async update(id: string, dadosNovos: UpdatePacienteDTO): Promise<Paciente> {
        const pacienteAntigo = await this.findById(id)

        if (pacienteAntigo.cpf != dadosNovos.cpf) {
            throw new ConflictException('Falha ao atualizar: CPF já utilizado por outro paciente')
        }

        try {
            const pacienteAtualizado = await this.prisma.paciente.update({
                where: { uuid: id },
                data: dadosNovos
            })

            return pacienteAtualizado
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code == 'P2025') {
                    throw new NotFoundException('Valor inválido: Paciente não encontrado')
                }
            }

            throw error
        }
    }

    async delete(id: string): Promise<object> {
        try {
            const pacienteDeletado = await this.prisma.paciente.delete({
                where: { uuid: id },
                select: {
                    nome: true,
                    cpf: true
                }
            })

            return pacienteDeletado
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code == 'P2025') {
                    throw new NotFoundException('Valor inválido: Paciente não encontrado')
                }
            }

            throw error
        }
    }

    // Criar lógica pra desativar paciente mudando o status prontuario_status
}