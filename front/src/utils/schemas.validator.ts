import {
    CLIENTE_PRONTUARIO_STATUS,
    LOCAL_SESSAO,
    PAPEIS,
    PRONTUARIO_STATUS,
    TIPO_SESSAO,
    TIPO_USUARIO,
} from '@/types/enums/enums'
import * as z from 'zod'

z.config(z.locales.pt())

const emptyToUndefined = z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.string().optional()
)

export const pacienteFieldsSchema = z.object({
    nome: z.string().min(1, 'O nome é obrigatório'),
    senha: z
        .string()
        .length(6)
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .max(6, 'A senha deve ter somente 6 caracteres'),
    cpf: z
        .stringFormat('cpf', /^(\d{3}\.\d{3}\.\d{3}-\d{2})|(\d{11})$/)
        .min(11, 'O CPF é composto por 11 números'),
    data_nascimento: z.iso.date().min(1, 'Data de nascimento é obrigatória'),
    prontuario_status: z
        .enum(CLIENTE_PRONTUARIO_STATUS)
        .default(CLIENTE_PRONTUARIO_STATUS.ATIVO),
})

const pacienteFieldsDefaultValues = {
    nome: '',
    senha: '',
    cpf: '',
    data_nascimento: '',
}

export const alunoFieldsSchema = z.object({
    matricula: z
        .string({ error: 'A matrícula tem que ser somente números' })
        .min(6, 'A matrícula deve conter 6 dígitos')
        .max(6, 'A matrícula deve ter somente 6 dígitos'),
    nome: z.string().min(1, 'O nome é obrigatório'),
    email: z.email({ pattern: z.regexes.email }),
    senha: z
        .string()
        .length(6)
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .max(6, 'A senha deve ter somente 6 caracteres'),
    periodo: z.coerce.number<string>().min(1, 'O período é obrigatório'),
    papel: z.enum(PAPEIS).default(PAPEIS.ALUNO),
    ativo: z.boolean().default(true),
})

const alunoFieldsDefaultValues = {
    matricula: '',
    nome: '',
    email: '',
    senha: '',
    periodo: '',
}

export const prontuarioFieldsSchema = z.object({
    aluno_id: z.number().optional(),
    paciente_id: z.number().optional(),
    data_hora: z.date(),
    duracao_minutos: z.number(),
    tipo_sessao: z.enum(TIPO_SESSAO).default(TIPO_SESSAO.INDIVIDUAL),
    local: z.enum(LOCAL_SESSAO),
    status: z.enum(PRONTUARIO_STATUS).default(PRONTUARIO_STATUS.AGENDADO),
    observacoes: z.string(),
})

export const prontuarioDefaultValues = {
    aluno_id: undefined,
    paciente_id: undefined,
    data_hora: new Date(),
    duracao_minutos: 60,
    tipo_sessao: TIPO_SESSAO.INDIVIDUAL,
    local: LOCAL_SESSAO.SALA_01,
    status: PRONTUARIO_STATUS.AGENDADO,
    observacoes: '',
}

export const pacienteLoginSchema = pacienteFieldsSchema.pick({
    cpf: true,
    senha: true,
})

export const alunoLoginSchema = alunoFieldsSchema
    .pick({
        matricula: true,
        email: true,
        senha: true,
    })
    .extend({
        matricula: emptyToUndefined.pipe(
            alunoFieldsSchema.shape.matricula.optional()
        ),
        email: emptyToUndefined.pipe(alunoFieldsSchema.shape.email.optional()),
    })
    .refine((data) => data.email || data.matricula, {
        message: 'Preencha o e-mail ou a matrícula',
        path: ['email'],
    })

export const DefaultValuesByType = {
    [TIPO_USUARIO.PACIENTE]: pacienteFieldsDefaultValues,
    [TIPO_USUARIO.ALUNO]: alunoFieldsDefaultValues,
}
export type PacienteFormValues = z.infer<typeof pacienteFieldsSchema>
export type AlunoFormValues = z.infer<typeof alunoFieldsSchema>
export type PacienteFormLoginValues = z.infer<typeof pacienteLoginSchema>
export type AlunoFormLoginValues = z.infer<typeof alunoLoginSchema>
export type ProntuarioRegisterForms = z.input<typeof prontuarioFieldsSchema>
export type RegisterFormValues = PacienteFormValues | AlunoFormValues
export type LoginFormValues = PacienteFormLoginValues | AlunoFormLoginValues
