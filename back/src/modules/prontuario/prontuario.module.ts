import { Module } from '@nestjs/common'
import { ProntuarioService } from './prontuario.service'
import { ProntuarioController } from './prontuario.controller'
import { PacienteModule } from '../paciente/paciente.module'
import { AlunoModule } from '../aluno/aluno.module'

@Module({
    imports: [PacienteModule, AlunoModule],
    providers: [ProntuarioService],
    controllers: [ProntuarioController],
    exports: [ProntuarioService],
})
export class ProntuarioModule {}
