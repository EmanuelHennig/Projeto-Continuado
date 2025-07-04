const mongoose = require('mongoose')
const { Schema } = mongoose

const autorSchema = new Schema({
  nome: {
    type: String,
    required: true
  }
}, {
  collection: 'autores',
  timestamps: true
})

module.exports = mongoose.model('Autor', autorSchema)
