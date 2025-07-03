// controllers/api/livroApiController.js
const Livro = require('../../models/livro')

module.exports = {
  async getAll(req, res) {
    try {
      const livros = await Livro.find().populate('categoria_id')
      res.json(livros)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'falha ao listar livros' })
    }
  },

  async getById(req, res) {
    try {
      const livro = await Livro.findById(req.params.id).populate('categoria_id')
      if (!livro) return res.status(404).json({ error: 'livro não encontrado' })
      res.json(livro)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'falha ao obter livro' })
    }
  },

  async create(req, res) {
    try {
      const novo = new Livro(req.body)
      await novo.save()
      res.status(201).json(novo)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'falha ao criar livro' })
    }
  },

  async update(req, res) {
    try {
      const atualizado = await Livro.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      if (!atualizado) return res.status(404).json({ error: 'livro não encontrado' })
      res.json(atualizado)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'falha ao atualizar livro' })
    }
  },

  async remove(req, res) {
    try {
      const excluido = await Livro.findByIdAndDelete(req.params.id)
      if (!excluido) return res.status(404).json({ error: 'livro não encontrado' })
      res.json({ message: 'livro excluído' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'falha ao excluir livro' })
    }
  }
}
