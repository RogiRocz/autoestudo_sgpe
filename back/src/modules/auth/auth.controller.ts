import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { RegisterDTO } from "./dto/register.dto";
import { Public } from "@common/decorator/public.decorator";
import { ApiExtraModels, ApiBody, ApiTags, ApiResponse } from "@nestjs/swagger";
import { CreateAlunoDTO } from "../aluno/dto/create-aluno.dto";
import { CreatePacienteDTO } from "../paciente/dto/create-paciente.dto";
import { AuthResponse, UserType } from "@common/interfaces/IAuth.interface";
import { AuthResponseDTO } from "./dto/authResponse.dto";
import { AlunoViewDTO } from "@modules/aluno/dto/alunoView.dto";
import { PacienteViewDTO } from "@modules/paciente/dto/pacienteView.dto";

@Public()
@ApiTags('auth')
@Controller('auth')
@ApiExtraModels(AuthResponseDTO, AlunoViewDTO, PacienteViewDTO, CreateAlunoDTO, CreatePacienteDTO)
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
    @ApiResponse({ type: AuthResponseDTO, description: 'Retorna o token e os dados específicos do tipo de usuário.' })
    async registerUser(@Body() dados: RegisterDTO): Promise<AuthResponse<UserType>> {
        return this.auth.registerUser(dados.type, dados.userData)
    }

    @ApiResponse({ type: AuthResponseDTO, description: 'Retorna o token e os dados específicos do tipo de usuário.' })
    @Post('login')
    async loginUser(@Body() dados: LoginDTO): Promise<AuthResponse<UserType>> {
        const { type, ...credenciais } = dados
        return this.auth.loginUser(type, credenciais)
    }
}