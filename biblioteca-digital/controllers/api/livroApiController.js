const Livro = require('../../models/livro')

module.exports = {
  async getAll(req, res) {
    try {
      const lista = await Livro.find().populate('categoria')
      return res.status(200).json(lista)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao listar livros' })
    }
  },

  async getById(req, res) {
    try {
      const item = await Livro.findById(req.params.id).populate('categoria')
      if (!item) {
        return res.status(404).json({ error: 'livro não encontrado' })
      }
      return res.status(200).json(item)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao obter livro' })
    }
  },

  async create(req, res) {
    try {
      const novo = new Livro(req.body)
      await novo.save()
      return res.status(201).json(novo)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao criar livro' })
    }
  },

  async update(req, res) {
    try {
      const atualizado = await Livro.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      if (!atualizado) {
        return res.status(404).json({ error: 'livro não encontrado' })
      }
      return res.status(200).json(atualizado)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao atualizar livro' })
    }
  },

  async remove(req, res) {
    try {
      const excluido = await Livro.findByIdAndDelete(req.params.id)
      if (!excluido) {
        return res.status(404).json({ error: 'livro não encontrado' })
      }
      return res.status(204).send()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao excluir livro' })
    }
  }
}
