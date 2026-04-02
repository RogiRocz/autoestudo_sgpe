import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/Prisma/prisma.module';
import { PacienteModule } from './modules/paciente/paciente.module';
import { ProntuarioModule } from './modules/prontuario/prontuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    PacienteModule,
    ProntuarioModule,
    AuthModule
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  controllers: []
})
export class AppModule {}
