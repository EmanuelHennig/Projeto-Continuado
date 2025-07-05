const mongoose = require('mongoose');
const db_mongoose = require('./config/db_mongoose');
const LogUsuario = require('./models/noSql/logUsuario');

mongoose.connect(db_mongoose.connection)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(() => console.log('Erro na conexão com o MongoDB'));

async function executarConsultas() {

  const logsReservas = await LogUsuario.find({ acao: 'reservou_livro' });
  console.log(logsReservas);

  const logsUsuario123 = await LogUsuario.find({ usuario_id: 123 });
  console.log(logsUsuario123);

  const logsDataMaior = await LogUsuario.find({
    data: { $gt: new Date('2025-01-01') }
  });
  console.log(logsDataMaior);

  const logsAnd = await LogUsuario.find({
    $and: [
      { usuario_id: 123 },
      { acao: 'reservou_livro' }
    ]
  });
  console.log(logsAnd);

  const logsPaginados = await LogUsuario.find().skip(0).limit(5);
  console.log(logsPaginados);

  const logsOrdenados = await LogUsuario.find().sort({ data: -1 });
  console.log(logsOrdenados);

  mongoose.disconnect();
}

executarConsultas();
