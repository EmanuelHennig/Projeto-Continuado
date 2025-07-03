const Comentario = require('../../models/comentario')
module.exports = {
  async getAll(req, res) {
    try {
      const lista = await Comentario.find()
      res.json(lista)
    } catch {
      res.status(500).json({ error: 'falha ao listar comentários' })
    }
  },
  async getById(req, res) {
    try {
      const item = await Comentario.findById(req.params.id)
      if (!item) return res.status(404).json({ error: 'comentário não encontrado' })
      res.json(item)
    } catch {
      res.status(500).json({ error: 'falha ao obter comentário' })
    }
  },
  async create(req, res) {
    try {
      const novo = new Comentario(req.body)
      await novo.save()
      res.status(201).json(novo)
    } catch {
      res.status(500).json({ error: 'falha ao criar comentário' })
    }
  },
  async update(req, res) {
    try {
      const atualizado = await Comentario.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!atualizado) return res.status(404).json({ error: 'comentário não encontrado' })
      res.json(atualizado)
    } catch {
      res.status(500).json({ error: 'falha ao atualizar comentário' })
    }
  },
  async remove(req, res) {
    try {
      const excluido = await Comentario.findByIdAndDelete(req.params.id)
      if (!excluido) return res.status(404).json({ error: 'comentário não encontrado' })
      res.json({ message: 'comentário excluído' })
    } catch {
      res.status(500).json({ error: 'falha ao excluir comentário' })
    }
  }
}
