const mongoose = require('mongoose')
const { Schema } = mongoose

const reservaSchema = new Schema({
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
  data_reserva: {
    type: Date,
    default: Date.now
  },
  data_limite_retirada: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['ativa', 'expirada', 'cancelada'],
    default: 'ativa'
  }
}, {
  collection: 'reservas',
  timestamps: true
})

module.exports = mongoose.model('Reserva', reservaSchema)
