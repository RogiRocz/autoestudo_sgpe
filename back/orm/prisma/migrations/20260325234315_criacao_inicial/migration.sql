-- CreateEnum
CREATE TYPE "CLIENTE_PRONTUARIO_STATUS" AS ENUM ('ATIVO', 'INATIVO', 'ARQUIVADO');

-- CreateEnum
CREATE TYPE "TIPO_SESSAO" AS ENUM ('INDIVIDUAL', 'GRUPO', 'TRIAGEM');

-- CreateEnum
CREATE TYPE "LOCAL_SESSAO" AS ENUM ('SALA_01', 'SALA_02', 'REMOTO');

-- CreateEnum
CREATE TYPE "PRONTUARIO_STATUS" AS ENUM ('AGENDADO', 'REALIZADO', 'CANCELADO', 'FALTA');

-- CreateTable
CREATE TABLE "paciente" (
    "uuid" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "prontuario_status" "CLIENTE_PRONTUARIO_STATUS" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "prontuario" (
    "uuid" TEXT NOT NULL,
    "id_paciente" TEXT,
    "data_hora" TIMESTAMP(3) NOT NULL,
    "duracao_minutos" INTEGER NOT NULL DEFAULT 60,
    "tipo_sessao" "TIPO_SESSAO" NOT NULL,
    "local" "LOCAL_SESSAO" NOT NULL,
    "status" "PRONTUARIO_STATUS" NOT NULL,
    "observacoes" TEXT NOT NULL,

    CONSTRAINT "prontuario_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "paciente_cpf_key" ON "paciente"("cpf");

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "paciente"("uuid") ON DELETE SET NULL ON UPDATE NO ACTION;
