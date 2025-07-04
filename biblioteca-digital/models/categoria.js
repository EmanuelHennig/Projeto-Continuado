const mongoose = require('mongoose')
const { Schema } = mongoose

const categoriaSchema = new Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  }
}, {
  collection: 'categorias',
  timestamps: true
})

module.exports = mongoose.model('Categoria', categoriaSchema)
