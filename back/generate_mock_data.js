const fs = require('fs');
const crypto = require('crypto');

function uuidv4() {
  return crypto.randomUUID();
}

function generateCPF() {
  const n = () => Math.floor(Math.random() * 9);
  let n1 = n(), n2 = n(), n3 = n(), n4 = n(), n5 = n(), n6 = n(), n7 = n(), n8 = n(), n9 = n();
  let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;
  let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;
  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}

function generateMatricula() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const alunos = [];
for (let i = 0; i < 5; i++) {
  alunos.push({
    uuid: uuidv4(),
    matricula: generateMatricula(),
    nome: `Aluno ${i + 1}`,
    email: `aluno${i + 1}@example.com`,
    senha: `Senha!${i + 1}`,
    periodo: Math.floor(Math.random() * 10) + 1,
    papel: 'ALUNO',
    ativo: true,
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString()
  });
}

const pacientes = [];
for (let i = 0; i < 15; i++) {
  pacientes.push({
    uuid: uuidv4(),
    nome: `Paciente ${i + 1}`,
    cpf: generateCPF(),
    senha: `Senha!${i + 1}`,
    data_nascimento: new Date(1970 + Math.random() * 40, Math.random() * 12, Math.random() * 28).toISOString().split('T')[0],
    prontuario_status: ['ATIVO', 'INATIVO', 'ARQUIVADO'][Math.floor(Math.random() * 3)],
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString()
  });
}

const prontuarios = [];
for (let i = 0; i < 50; i++) {
  const aluno = alunos[Math.floor(Math.random() * alunos.length)];
  const paciente = pacientes[Math.floor(Math.random() * pacientes.length)];
  prontuarios.push({
    uuid: uuidv4(),
    aluno_id: aluno.uuid,
    paciente_id: paciente.uuid,
    data_hora: new Date(2023, Math.random() * 12, Math.random() * 28, 8 + Math.random() * 10, 0).toISOString(),
    duracao_minutos: 60,
    tipo_sessao: ['INDIVIDUAL', 'GRUPO', 'TRIAGEM'][Math.floor(Math.random() * 3)],
    local: ['SALA_01', 'SALA_02', 'REMOTO'][Math.floor(Math.random() * 3)],
    status: ['AGENDADO', 'REALIZADO', 'CANCELADO', 'FALTA'][Math.floor(Math.random() * 4)],
    observacoes: `Observação da sessão ${i + 1}`,
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString()
  });
}

const credentials = [
  ...alunos.map(a => ({ type: 'ALUNO', email: a.email, password: a.senha })),
  ...pacientes.map(p => ({ type: 'PACIENTE', cpf: p.cpf, password: p.senha }))
];

const mockData = {
  alunos,
  pacientes,
  prontuarios,
  credentials
};

fs.writeFileSync('mock-data.json', JSON.stringify(mockData, null, 2));
console.log('Mock data generated successfully in mock-data.json');
