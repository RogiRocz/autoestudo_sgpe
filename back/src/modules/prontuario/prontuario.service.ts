import { PrismaService } from "src/common/Prisma/prisma.service";
import { CreateProntuarioDTO } from "./dto/create-prontuario.dto";
import { Prontuario } from "./entites/prontuario.entity";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UpdateProntuarioDTO } from "./dto/update-prontuario.dto";

@Injectable()
export class ProntuarioService {
    constructor(private prisma: PrismaService) { }

    async create(dadosProntuario: CreateProntuarioDTO): Promise<Prontuario> {
        const novoProntuario = await this.prisma.prontuario.create({
            data: {
                id_paciente: dadosProntuario.id_paciente,
                data_hora: dadosProntuario.data_hora,
                duracao_minutos: dadosProntuario.duracao_minutos,
                tipo_sessao: dadosProntuario.tipo_sessao,
                local: dadosProntuario.local,
                status: dadosProntuario.status,
                observacoes: dadosProntuario.observacoes
            }
        })

        return novoProntuario
    }

    async findAllProntuarios(size: number, page: number): Promise<Prontuario[]> {
        const skip = size * (page - 1)
        const total_records = await this.prisma.prontuario.count()

        if (skip >= total_records) {
            throw new BadRequestException('Valor na paginação: O valor recebido está inválido')
        }

        const query = await this.prisma.prontuario.findMany({
            skip: skip,
            take: size,
            orderBy: {
                uuid: 'asc'
            }
        })

        return query
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

            if (prontuarioAntigo.id_paciente != dadosNovos.id_paciente) {
                throw new ConflictException('Falha ao atualizar: O prontuário não pode ser mudado de paciente')
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
                    id_paciente: true
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