import { CLIENTE_PRONTUARIO_STATUS, PAPEIS, TIPO_USUARIO } from "@/types/enums/enums"
import * as z from "zod"

export const pacienteFieldsSchema = z.object({
    nome: z.email(),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    cpf: z
        .stringFormat("cpf", /^(\d{3}\.\d{3}\.\d{3}-\d{2})|(\d{11})$/)
        .min(11, "O CPF é composto por 11 números"),
    data_nascimento: z.iso.date(),
    prontuario_status: z.enum(CLIENTE_PRONTUARIO_STATUS).default(CLIENTE_PRONTUARIO_STATUS.ATIVO)
})

const pacienteFieldsDefaultValues = {
    nome: '', senha: '', cpf: '000.000.000-00', data_nascimento: ''
}

export const alunoFieldsSchema = z.object({
    matricula: z.coerce.number<string>().min(6, 'A matrícula contém 6 dígitos'),
    nome: z.string(),
    email: z.email(),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    periodo: z.number(),
    papel: z.enum(PAPEIS).default(PAPEIS.ALUNO),
    ativo: z.boolean().default(true)
})

const alunoFieldsDefaultValues = {
    matricula: '', nome: '', email: '', senha: '', periodo: ''
}

export const DefaultValuesByType = {
    [TIPO_USUARIO.PACIENTE]: pacienteFieldsDefaultValues,
    [TIPO_USUARIO.ALUNO]: alunoFieldsDefaultValues
}
export type PacienteFormValues = z.infer<typeof pacienteFieldsSchema>
export type AlunoFormValues = z.infer<typeof alunoFieldsSchema>
export type FormValues = PacienteFormValues | AlunoFormValues