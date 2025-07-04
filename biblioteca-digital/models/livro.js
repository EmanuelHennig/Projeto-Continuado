// models/livro.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const livroSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  editora: {
    type: String
  },
  ano_publicacao: {
    type: Number
  },
  isbn: {
    type: String,
    unique: true
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  status: {
    type: String,
    enum: ['disponível', 'emprestado', 'reservado'],
    default: 'disponível'
  },
  autores: [{
    type: Schema.Types.ObjectId,
    ref: 'Autor'
  }]
}, {
  collection: 'livros',
  timestamps: true
});

module.exports = mongoose.model('Livro', livroSchema);
