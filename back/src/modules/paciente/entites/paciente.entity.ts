import { ApiProperty } from '@nestjs/swagger';
import { CLIENTE_PRONTUARIO_STATUS } from '@prisma/client/enums';
import { BaseUser, IAuthenticatable } from 'src/common/interfaces/IAuth.interface';
import { Prontuario } from 'src/modules/prontuario/entites/prontuario.entity';

export class Paciente extends BaseUser implements IAuthenticatable {
	@ApiProperty({ example: 'uuid-v4-do-paciente' })
	declare uuid: string;

	@ApiProperty({ example: 'João Silva', description: 'Nome completo do paciente' })
	nome: string;

	@ApiProperty({ example: '12345678901', description: 'CPF (apenas 11 números)' })
	cpf: string;

	@ApiProperty({ example: 'Senha!123', description: 'Senha plana antes de ser criptografada', writeOnly: true })
	declare senha: string

	@ApiProperty({ example: '12/12/2012', description: 'Data de nascimento em formato ISO' })
	data_nascimento: Date;

	@ApiProperty({ enum: CLIENTE_PRONTUARIO_STATUS, example: CLIENTE_PRONTUARIO_STATUS.ATIVO, description: 'Status de atividade do paciente no sistema' })
	prontuario_status: CLIENTE_PRONTUARIO_STATUS;

	@ApiProperty({ description: 'Data de criação do registro do paciente' })
	criadoEm: Date

	@ApiProperty({ description: 'Data da atualização de alguma informação do paciente' })
	atualizadoEm: Date

	@ApiProperty({ type: () => [Prontuario], isArray: true, required: false, description: 'Prontuários das sessões do paciente' })
	prontuarios?: Prontuario[]
}
