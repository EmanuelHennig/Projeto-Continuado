const mongoose = require('mongoose')
const { Schema } = mongoose

const usuarioSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  tipo_usuario: {
    type: String,
    enum: ['aluno', 'professor', 'admin'],
    default: 'aluno'
  },
  cpf: {
    type: String,
    required: true,
    unique: true
  },
  telefone: {
    type: String
  }
}, {
  collection: 'usuarios',
  timestamps: true
})

module.exports = mongoose.model('Usuario', usuarioSchema)
