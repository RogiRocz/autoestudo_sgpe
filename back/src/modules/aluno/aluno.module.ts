import { Module } from '@nestjs/common'
import { AlunoService } from './aluno.service'
import { AlunoController } from './aluno.controller'
import { PrismaModule } from '@common/Prisma/prisma.module'

@Module({
    imports: [PrismaModule],
    providers: [AlunoService],
    controllers: [AlunoController],
    exports: [AlunoService],
})
export class AlunoModule {}
