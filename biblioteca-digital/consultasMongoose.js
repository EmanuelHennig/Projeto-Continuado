const mongoose = require('mongoose');
const db_mongoose = require('./config/db_mongoose');
const LogUsuario = require('./models/noSql/logUsuario');

mongoose.connect(db_mongoose.connection)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(() => console.log('Erro na conexão com o MongoDB'));

async function executarConsultas() {

  //Buscar todos os logs de ação 'reservou_livro'
  const logsReservas = await LogUsuario.find({ acao: 'reservou_livro' });
  console.log(logsReservas);

  //Buscar todos os logs de um usuário específico (usuario_id = 123)
  const logsUsuario123 = await LogUsuario.find({ usuario_id: 123 });
  console.log(logsUsuario123);

  //Buscar logs com data maior que 01/01/2025
  const logsDataMaior = await LogUsuario.find({
    data: { $gt: new Date('2025-01-01') }
  });
  console.log(logsDataMaior);

  //Buscar logs com operador lógico AND (usuario_id = 123 e ação = 'reservou_livro')
  const logsAnd = await LogUsuario.find({
    $and: [
      { usuario_id: 123 },
      { acao: 'reservou_livro' }
    ]
  });
  console.log(logsAnd);

  //Paginação: pegar os primeiros 5 logs (skip 0, limit 5)
  const logsPaginados = await LogUsuario.find().skip(0).limit(5);
  console.log(logsPaginados);

  //Ordenação: logs mais recentes primeiro (ordem decrescente por data)
  const logsOrdenados = await LogUsuario.find().sort({ data: -1 });
  console.log(logsOrdenados);

  mongoose.disconnect();
}

executarConsultas();
