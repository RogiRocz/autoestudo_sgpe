import { Injectable } from '@nestjs/common';
import { PAPEIS, CLIENTE_PRONTUARIO_STATUS, TIPO_SESSAO, LOCAL_SESSAO, PRONTUARIO_STATUS } from '@prisma/client';

@Injectable()
export class ConfigService {
    getEnums() {
        return {
            papeis: Object.values(PAPEIS),
            statusProntuario: Object.values(CLIENTE_PRONTUARIO_STATUS),
            tiposSessao: Object.values(TIPO_SESSAO),
            local_sessao: Object.values(LOCAL_SESSAO),
            prontuario_status: Object.values(PRONTUARIO_STATUS)
        };
    }
}