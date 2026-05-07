// front/src/api/mocks/mockHandler.ts
import db from './db.json'
import { TIPO_USUARIO } from '@/types/enums/enums'

// Helper para simular a paginação do Prisma que você usa no back
const paginate = (data: any[], page: number, size: number) => {
	const start = (page - 1) * size
	const end = start + size
	return {
		metadata: {
			page,
			size,
			totalPages: Math.ceil(data.length / size),
			totalItems: data.length,
		},
		data: data.slice(start, end),
	}
}

export async function handleMockRequest(endpoint: string, options: RequestInit) {
	await new Promise((res) => setTimeout(res, 400)) // Simula lag
	const url = new URL(endpoint, 'http://localhost:3000')
	const path = url.pathname
	const params = url.searchParams

	// console.log(`url: ${url}, path: ${path}, params: ${params}`);

	// --- AUTH ---
	if (path.includes('/auth/login')) {
		const body = JSON.parse(options.body as string)
		const userType = body.type // 'aluno' ou 'paciente'

		// Simula a busca por identificador (CPF ou Email/Matrícula)
		const user = userType === 'aluno'
			? db.alunos.find(a => a.email === body.login || a.matricula === body.login)
			: db.pacientes.find(p => p.cpf === body.login)

		if (!user) throw new Error("Usuário não encontrado")

		return {
			token: "mock-jwt-token-valido",
			user: { ...user, type: userType }
		}
	}

	// --- CONFIG ENUMS ---
	if (path.includes('/config/enums')) {
		return {
			papeis: ["ALUNO"],
			statusProntuario: ["ATIVO", "INATIVO", "ARQUIVADO"],
			tiposSessao: ["INDIVIDUAL", "GRUPO", "TRIAGEM"],
			locaisSessao: ["SALA_01", "SALA_02", "REMOTO"],
			prontuarioStatus: ["AGENDADO", "REALIZADO", "CANCELADO", "FALTA"],
			tiposUsuario: ["aluno", "paciente"]
		}
	}

	// --- PACIENTES SEARCH ---
	if (path.includes('/pacientes/search')) {
		const word = params.get('word')?.toLowerCase() || ""
		return db.pacientes.filter(p => p.nome.toLowerCase().includes(word))
	}

	// --- ALUNOS SEARCH ---
	if (path.includes('/alunos/search')) {
		const word = params.get('word')?.toLowerCase() || ""
		return db.alunos.filter(p => p.nome.toLowerCase().includes(word))
	}

	// --- PRONTUÁRIOS (Lógica baseada no seu prontuario.service.ts) ---
	if (path.includes('/prontuarios')) {
		let filtered = [...db.prontuarios]
		const page = parseInt(params.get('page') || '1')
		const size = parseInt(params.get('size') || '10')

		// Filtro por Aluno ou Paciente (Ex: /prontuarios/aluno/uuid)
		if (path.includes('/aluno/')) {
			const id = path.split('/').pop()
			filtered = filtered.filter(p => p.aluno_id === id)
		} else if (path.includes('/paciente/')) {
			const id = path.split('/').pop()
			filtered = filtered.filter(p => p.paciente_id === id)
		}

		// Filtro por Local
		if (path.includes('/local/')) {
			const local = path.split('/').pop()
			filtered = filtered.filter(p => p.local === local)
		}

		// Filtro por Status
		if (path.includes('/status/')) {
			const status = path.split('/').pop()
			filtered = filtered.filter(p => p.status === status)
		}

		const enrichedData = filtered.map(prontuario => {
			return {
				...prontuario,
				// Busca o objeto completo do aluno pelo UUID
				aluno: db.alunos.find(a => a.uuid === prontuario.aluno_id) || null,
				// Busca o objeto completo do paciente pelo UUID
				paciente: db.pacientes.find(p => p.uuid === prontuario.paciente_id) || null
			}
		})

		// Paginação final
		return paginate(enrichedData, page, size)
	}

	return { message: "Rota mockada não encontrada", path }
}