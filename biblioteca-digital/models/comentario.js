// biblioteca-digital/models/comentario.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComentarioSchema = new Schema({
  titulo: { type: String, required: true },
  texto:  { type: String, required: true },
  autor:  { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comentario', ComentarioSchema);
