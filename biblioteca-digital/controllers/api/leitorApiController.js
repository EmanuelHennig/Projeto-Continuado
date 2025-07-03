const Leitor = require('../../models/leitor')
module.exports = {
  async getAll(req, res) {
    try {
      const lista = await Leitor.find()
      res.json(lista)
    } catch {
      res.status(500).json({ error: 'falha ao listar leitores' })
    }
  },
  async getById(req, res) {
    try {
      const item = await Leitor.findById(req.params.id)
      if (!item) return res.status(404).json({ error: 'leitor não encontrado' })
      res.json(item)
    } catch {
      res.status(500).json({ error: 'falha ao obter leitor' })
    }
  },
  async create(req, res) {
    try {
      const novo = new Leitor(req.body)
      await novo.save()
      res.status(201).json(novo)
    } catch {
      res.status(500).json({ error: 'falha ao criar leitor' })
    }
  },
  async update(req, res) {
    try {
      const atualizado = await Leitor.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!atualizado) return res.status(404).json({ error: 'leitor não encontrado' })
      res.json(atualizado)
    } catch {
      res.status(500).json({ error: 'falha ao atualizar leitor' })
    }
  },
  async remove(req, res) {
    try {
      const excluido = await Leitor.findByIdAndDelete(req.params.id)
      if (!excluido) return res.status(404).json({ error: 'leitor não encontrado' })
      res.json({ message: 'leitor excluído' })
    } catch {
      res.status(500).json({ error: 'falha ao excluir leitor' })
    }
  }
}
