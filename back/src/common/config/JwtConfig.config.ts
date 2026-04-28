import { ConfigService } from '@nestjs/config'
import { JwtModuleAsyncOptions } from '@nestjs/jwt'

export const jwtConfig: JwtModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const expiresInMinutes = parseInt(
            configService.get<string>('JWT_SECRET_EXP_MIN', '60'),
            10
        )
        return {
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn: `${expiresInMinutes} m`,
            },
        }
    },
}
