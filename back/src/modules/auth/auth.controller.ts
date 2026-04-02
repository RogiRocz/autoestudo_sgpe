import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { RegisterDTO } from "./dto/register.dto";
import { Public } from "src/common/decorator/public.decorator";
import { ApiExtraModels, ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateAlunoDTO } from "../aluno/dto/create-aluno.dto";
import { CreatePacienteDTO } from "../paciente/dto/create-paciente.dto";

@Public()
@ApiTags('auth')
@Controller('auth')
@ApiExtraModels(CreateAlunoDTO, CreatePacienteDTO)
export class AuthController {
    constructor(private readonly auth: AuthService) { }

    @Post('register')
    @ApiBody({
        type: RegisterDTO,
        examples: {
            aluno: {
                summary: 'Exemplo Aluno',
                description: 'Payload completo para cadastro de Aluno',
                value: {
                    type: 'aluno',
                    userData: {
                        matricula: '235689',
                        nome: 'João Silva',
                        email: 'aluno@example.com',
                        senha: 'SenhaForte!123',
                        periodo: 10,
                        papel: 'ALUNO',
                        ativo: true
                    }
                }
            },
            paciente: {
                summary: 'Exemplo Paciente',
                description: 'Payload completo para cadastro de Paciente',
                value: {
                    type: 'paciente',
                    userData: {
                        nome: 'Maria Souza',
                        cpf: '12345678901',
                        senha: 'SenhaForte!123',
                        data_nascimento: '1995-05-20',
                        prontuario_status: 'ATIVO'
                    }
                }
            }
        }
    })
    async registerUser(@Body() dados: RegisterDTO): Promise<string> {
        return this.auth.registerUser(dados.type, dados.userData)
    }

    @Post('login')
    async loginUser(@Body() dados: LoginDTO): Promise<string> {
        const { type, ...credenciais } = dados
        return this.auth.loginUser(type, credenciais)
    }
}