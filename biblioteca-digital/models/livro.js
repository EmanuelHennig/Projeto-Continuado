const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const livroSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  ano: {
    type: Number
  },
  isbn: {
    type: String
  },
  categoria_id: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  imagem: {
    type: String
  }
})

module.exports = mongoose.model('Livro', livroSchema)
