import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { AuthService } from '@modules/auth/auth.service'
import { IS_PUBLIC_KEY } from '../decorator/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector
    ) {}

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        )
        if (isPublic) return true

        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException(
                'Falha na requisição: Token não encontrado ou inválido'
            )
        }

        try {
            const payload = await this.authService.verifyToken(token)
            const user = await this.authService.getUser(payload)

            request['user'] = user

            return true
        } catch (error) {
            const response = context.switchToHttp().getResponse()
            response.setHeader('X-Token-Expired', 'true')

            throw new UnauthorizedException(
                'Sua sessão expirou. Faça login novamente.'
            )
        }
    }
}
