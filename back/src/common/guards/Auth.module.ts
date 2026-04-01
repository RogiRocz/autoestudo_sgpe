import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../config/JwtConfig.config";
import { AuthService } from "./Auth.service";
import { HashHelper } from "../utils/Hashing.helper";

@Module({
    imports: [JwtModule.registerAsync(jwtConfig)],
    providers: [AuthService, HashHelper],
    exports: [AuthService, HashHelper]
})
export class AuthModule {}