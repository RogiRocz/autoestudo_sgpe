import { UserType } from '@common/interfaces/IAuth.interface';
import { Injectable } from '@nestjs/common';
import { PAPEIS, CLIENTE_PRONTUARIO_STATUS, TIPO_SESSAO, LOCAL_SESSAO, PRONTUARIO_STATUS } from '@prisma/client';

@Injectable()
export class ConfigService {
	getEnums() {
		return {
			papeis: Object.values(PAPEIS),
			statusProntuario: Object.values(CLIENTE_PRONTUARIO_STATUS),
			tiposSessao: Object.values(TIPO_SESSAO),
			locaisSessao: Object.values(LOCAL_SESSAO),
			prontuarioStatus: Object.values(PRONTUARIO_STATUS),
			tiposUsuario: Object.values(UserType)
		};
	}
}