const mongoose = require('mongoose')
const { Schema } = mongoose

const emprestimoSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  livro: {
    type: Schema.Types.ObjectId,
    ref: 'Livro',
    required: true
  },
  data_emprestimo: {
    type: Date,
    default: Date.now
  },
  data_devolucao_prevista: {
    type: Date,
    required: true
  },
  data_devolucao: {
    type: Date
  }
}, {
  collection: 'emprestimos',
  timestamps: true
})

module.exports = mongoose.model('Emprestimo', emprestimoSchema)
