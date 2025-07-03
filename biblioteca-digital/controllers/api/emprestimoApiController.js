const Emprestimo = require('../../models/emprestimo')
module.exports = {
  async getAll(req, res) {
    try {
      const lista = await Emprestimo.find()
      res.json(lista)
    } catch {
      res.status(500).json({ error: 'falha ao listar empréstimos' })
    }
  },
  async getById(req, res) {
    try {
      const item = await Emprestimo.findById(req.params.id)
      if (!item) return res.status(404).json({ error: 'empréstimo não encontrado' })
      res.json(item)
    } catch {
      res.status(500).json({ error: 'falha ao obter empréstimo' })
    }
  },
  async create(req, res) {
    try {
      const novo = new Emprestimo(req.body)
      await novo.save()
      res.status(201).json(novo)
    } catch {
      res.status(500).json({ error: 'falha ao criar empréstimo' })
    }
  },
  async update(req, res) {
    try {
      const atualizado = await Emprestimo.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!atualizado) return res.status(404).json({ error: 'empréstimo não encontrado' })
      res.json(atualizado)
    } catch {
      res.status(500).json({ error: 'falha ao atualizar empréstimo' })
    }
  },
  async remove(req, res) {
    try {
      const excluido = await Emprestimo.findByIdAndDelete(req.params.id)
      if (!excluido) return res.status(404).json({ error: 'empréstimo não encontrado' })
      res.json({ message: 'empréstimo excluído' })
    } catch {
      res.status(500).json({ error: 'falha ao excluir empréstimo' })
    }
  }
}
