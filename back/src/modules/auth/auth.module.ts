import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from '../../common/config/JwtConfig.config'
import { AuthService } from './auth.service'
import { HashHelper } from '../../common/utils/Hashing.helper'
import { AuthController } from './auth.controller'
import { PacienteModule } from '../paciente/paciente.module'
import { AlunoModule } from '../aluno/aluno.module'

@Module({
    imports: [JwtModule.registerAsync(jwtConfig), PacienteModule, AlunoModule],
    controllers: [AuthController],
    providers: [AuthService, HashHelper],
    exports: [AuthService, HashHelper],
})
export class AuthModule {}
