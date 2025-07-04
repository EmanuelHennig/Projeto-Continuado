const Emprestimo = require('../../models/emprestimo')

module.exports = {
  async getAll(req, res) {
    try {
      const lista = await Emprestimo.find()
        .populate('usuario')
        .populate('livro')
      return res.status(200).json(lista)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao listar empréstimos' })
    }
  },

  async getById(req, res) {
    try {
      const item = await Emprestimo.findById(req.params.id)
        .populate('usuario')
        .populate('livro')
      if (!item) {
        return res.status(404).json({ error: 'empréstimo não encontrado' })
      }
      return res.status(200).json(item)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao obter empréstimo' })
    }
  },

  async create(req, res) {
    try {
      const novo = new Emprestimo(req.body)
      await novo.save()
      return res.status(201).json(novo)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao criar empréstimo' })
    }
  },

  async update(req, res) {
    try {
      const atualizado = await Emprestimo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      if (!atualizado) {
        return res.status(404).json({ error: 'empréstimo não encontrado' })
      }
      return res.status(200).json(atualizado)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao atualizar empréstimo' })
    }
  },

  async remove(req, res) {
    try {
      const excluido = await Emprestimo.findByIdAndDelete(req.params.id)
      if (!excluido) {
        return res.status(404).json({ error: 'empréstimo não encontrado' })
      }
      return res.status(204).send()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao excluir empréstimo' })
    }
  }
}
