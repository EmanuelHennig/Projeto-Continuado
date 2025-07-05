const mongoose = require('mongoose')
const { Schema } = mongoose

const logUsuarioSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  acao: {
    type: String,
    required: true
  },
  livro: {
    type: Schema.Types.ObjectId,
    ref: 'Livro'
  },
  data: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'logs_usuarios',
  timestamps: false
})

module.exports = mongoose.model('LogUsuario', logUsuarioSchema)
