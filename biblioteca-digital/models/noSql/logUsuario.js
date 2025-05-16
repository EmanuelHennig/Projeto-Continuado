const mongoose = require('mongoose');

const LogUsuario = mongoose.model('LogUsuario', {
  usuario_id: Number,
  acao: String,
  livro_id: Number,
  data: Date
});

module.exports = LogUsuario;
