import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { UserPayload } from "src/common/dto/UserPayload.dto";
import { RegisterDTO } from "./dto/register.dto";
import { Public } from "src/common/decorator/public.decorator";

@Public()
@Controller('auth')
export class AuthController {
    constructor (private readonly auth: AuthService) {}

    @Post('register')
    async registerUser(@Body() dados: RegisterDTO) : Promise<UserPayload> {
        return this.auth.registerUser(dados.type, dados.userData)
    }

    @Post('login')
    async loginUser(@Body() dados: LoginDTO): Promise<UserPayload>{
        const {type, ...credenciais} = dados
        return this.auth.loginUser(type, credenciais)
    }
}