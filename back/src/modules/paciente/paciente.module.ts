import { Module } from "@nestjs/common";
import { PacienteService } from "./paciente.service";
import { PacienteController } from "./paciente.controller";
import { PrismaModule } from "src/common/Prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [PacienteService],
    controllers: [PacienteController],
    exports: [PacienteService]
})
export class PacienteModule { }