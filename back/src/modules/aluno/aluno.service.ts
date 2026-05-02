import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import { CreateAlunoDTO } from './dto/create-aluno.dto'
import { UpdateAlunoDTO } from './dto/update-aluno.dto'
import { Aluno } from './entities/aluno.entity'
import { PrismaService } from '@common/Prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { QueryParamsDTO } from '@common/dto/QueryParams.dto'
import {
	createPagination,
	getPaginationPrisma,
} from '@common/utils/PrismaQuery.helper'
import { IAuthService } from '@common/interfaces/IAuth.interface'
import { Fields } from '../auth/dto/login.dto'
import { PaginatedResponse } from '@common/dto/PaginatedResponse.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class AlunoService implements IAuthService {
	constructor(private prisma: PrismaService) { }

	async create(dadosAluno: CreateAlunoDTO): Promise<Aluno> {
		if (
			(await this.findByMatricula(dadosAluno.matricula)) ||
			(await this.findByEmail(dadosAluno.email))
		) {
			throw new ConflictException('Falha na criação: Aluno já cadastrado')
		}

		const alunoNovo = await this.prisma.aluno.create({
			data: dadosAluno,
		})

		return alunoNovo
	}

	async findByIdentifier(login: string, field?: Fields): Promise<Aluno> {
		const searchField = field || Fields.EMAIL
		switch (searchField) {
			case Fields.MATRICULA:
				return await this.findByMatricula(login)
			case Fields.EMAIL:
				return await this.findByEmail(login)
			default:
				throw new InternalServerErrorException(
					'Falha em busca: Campo para buscar inexistente'
				)
		}
	}

	async findById(id: string): Promise<Aluno> {
		try {
			return this.prisma.aluno.findUniqueOrThrow({
				where: {
					uuid: id,
				},
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new NotFoundException('Falha em busca: Aluno não existe')
			}

			throw error
		}
	}

	async findByMatricula(matricula: string): Promise<Aluno> {
		try {
			return this.prisma.aluno.findUniqueOrThrow({
				where: { matricula },
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new NotFoundException('Falha em busca: Aluno não existe')
			}

			throw error
		}
	}

	async findByEmail(email: string): Promise<Aluno> {
		try {
			return this.prisma.aluno.findUniqueOrThrow({
				where: { email },
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new NotFoundException('Falha em busca: Aluno não existe')
			}

			throw error
		}
	}

	async search(word: string): Promise<Aluno[]> {
		if (!word) return []

		try {
			const query = await this.prisma.aluno.findMany({
				where: {
					nome: {
						contains: word,
						mode: 'insensitive',
					},
				},
				orderBy: {
					nome: 'asc',
				},
			})

			return query
		} catch (error) {
			console.error(error)
			return []
		}
	}

	async findAll(params: QueryParamsDTO): Promise<PaginatedResponse<Aluno>> {
		const skip = params.size * (params.page - 1)
		const total_records = await this.prisma.aluno.count()

		if (skip >= total_records) {
			throw new BadRequestException(
				'Valor na paginação: O valor recebido está inválido'
			)
		}

		const query = await this.prisma.aluno.findMany(
			getPaginationPrisma(params)
		)

		const instancias = plainToInstance(Aluno, query)

		return createPagination(instancias, total_records, params)
	}

	async update(id: string, dadosNovos: UpdateAlunoDTO): Promise<Aluno> {
		if (
			dadosNovos.matricula &&
			(await this.findByMatricula(dadosNovos.matricula))
		) {
			throw new ConflictException(
				'Falha na atualização: Matrícula já cadastrada'
			)
		}

		if (dadosNovos.email && (await this.findByEmail(dadosNovos.email))) {
			throw new ConflictException(
				'Falha na atualização: Email já cadastrado'
			)
		}

		return this.prisma.aluno.update({
			where: { uuid: id },
			data: dadosNovos,
		})
	}

	async deactivate(id: string): Promise<void> {
		await this.update(id, { ativo: false })
	}

	async delete(id: string): Promise<void> {
		await this.prisma.aluno.delete({
			where: { uuid: id },
			select: {
				uuid: true,
				matricula: true,
				email: true,
			},
		})
	}
}
