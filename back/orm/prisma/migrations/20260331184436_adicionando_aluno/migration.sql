/*
  Warnings:

  - You are about to drop the column `id_paciente` on the `prontuario` table. All the data in the column will be lost.
  - Added the required column `atualizadoEm` to the `prontuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PAPEIS" AS ENUM ('ALUNO');

-- DropForeignKey
ALTER TABLE "prontuario" DROP CONSTRAINT "prontuario_id_paciente_fkey";

-- AlterTable
ALTER TABLE "prontuario" DROP COLUMN "id_paciente",
ADD COLUMN     "aluno_id" TEXT,
ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paciente_id" TEXT;

-- CreateTable
CREATE TABLE "aluno" (
    "uuid" TEXT NOT NULL,
    "matricula" VARCHAR(6) NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "periodo" INTEGER NOT NULL,
    "papel" "PAPEIS" NOT NULL DEFAULT 'ALUNO',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_matricula_key" ON "aluno"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_key" ON "aluno"("email");

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("uuid") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "aluno"("uuid") ON DELETE SET NULL ON UPDATE NO ACTION;
