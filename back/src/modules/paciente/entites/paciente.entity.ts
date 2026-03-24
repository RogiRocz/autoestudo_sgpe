import { CLIENTE_PRONTUARIO_STATUS } from 'orm/generated/prisma/enums';
import { Prontuario } from 'src/modules/prontuario/entites/prontuario.entity';

export class Paciente {
	uuid: string;
	nome: string;
	/* CPF apenas com números (máx caracteres: 11)
        @example: 12345678901
    */
	cpf: string;
	data_nascimento: Date;
	prontuario_status: CLIENTE_PRONTUARIO_STATUS;

	prontuarios?: Prontuario[]
	criadoEm: Date;
	atualizadoEm: Date;
}
