/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import {expand} from 'dotenv-expand'

const rootPath = path.join(process.chdir('..'))
const env = dotenv.config({ path: path.join(rootPath, '.env') });
expand(env)

async function main() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL não definida no arquivo .env');
  }  

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  const prisma = new PrismaClient({
    adapter,
    log: ['query', 'error', 'warn'],
  });

  try {
    const mockDataPath = path.join(process.cwd(), 'mock_data' ,'mock-data.json');
    console.log(mockDataPath);
    
    if (!fs.existsSync(mockDataPath)) {
      console.error('Arquivo mock-data.json não encontrado. Execute o script de geração primeiro.');
      process.exit(1);
    }

    const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));

    console.log('Limpando o banco de dados...');
    try {
      await prisma.prontuario.deleteMany();
      await prisma.aluno.deleteMany();
      await prisma.paciente.deleteMany();
    } catch (e) {
      console.warn('Erro ao limpar tabelas:', e.message);
    }

    console.log('Semeando Alunos...');
    for (const aluno of mockData.alunos) {
      const hashedPassword = await bcrypt.hash(aluno.senha, 12);
      await prisma.aluno.create({
        data: {
          ...aluno,
          senha: hashedPassword,
        },
      });
    }

    console.log('Semeando Pacientes...');
    for (const paciente of mockData.pacientes) {
      const hashedPassword = await bcrypt.hash(paciente.senha, 12);
      await prisma.paciente.create({
        data: {
          ...paciente,
          senha: hashedPassword,
          data_nascimento: new Date(paciente.data_nascimento),
        },
      });
    }

    console.log('Semeando Prontuários...');
    for (const prontuario of mockData.prontuarios) {
      await prisma.prontuario.create({
        data: {
          ...prontuario,
          data_hora: new Date(prontuario.data_hora),
        },
      });
    }

    console.log('Semeio concluído com sucesso!');
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });