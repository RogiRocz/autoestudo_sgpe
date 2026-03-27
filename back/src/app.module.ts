import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/Prisma/prisma.module';
import { PacienteModule } from './modules/paciente/paciente.module';
import { ProntuarioModule } from './modules/prontuario/prontuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    PacienteModule,
    ProntuarioModule
  ],
  providers: [],
  controllers: []
})
export class AppModule {}
