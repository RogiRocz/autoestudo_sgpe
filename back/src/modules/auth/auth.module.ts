import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../../common/config/JwtConfig.config";
import { AuthService } from "./auth.service";
import { HashHelper } from "../../common/utils/Hashing.helper";

@Module({
    imports: [JwtModule.registerAsync(jwtConfig)],
    providers: [AuthService, HashHelper],
    exports: [AuthService, HashHelper]
})
export class AuthModule {}