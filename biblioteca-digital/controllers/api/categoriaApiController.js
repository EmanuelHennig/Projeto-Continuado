const Categoria = require('../../models/categoria')

module.exports = {
  async getAll(req, res) {
    try {
      const lista = await Categoria.find()
      return res.status(200).json(lista)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao listar categorias' })
    }
  },

  async getById(req, res) {
    try {
      const item = await Categoria.findById(req.params.id)
      if (!item) {
        return res.status(404).json({ error: 'categoria não encontrada' })
      }
      return res.status(200).json(item)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao obter categoria' })
    }
  },

  async create(req, res) {
    try {
      const novo = new Categoria(req.body)
      await novo.save()
      return res.status(201).json(novo)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao criar categoria' })
    }
  },

  async update(req, res) {
    try {
      const atualizado = await Categoria.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      if (!atualizado) {
        return res.status(404).json({ error: 'categoria não encontrada' })
      }
      return res.status(200).json(atualizado)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao atualizar categoria' })
    }
  },

  async remove(req, res) {
    try {
      const excluido = await Categoria.findByIdAndDelete(req.params.id)
      if (!excluido) {
        return res.status(404).json({ error: 'categoria não encontrada' })
      }
      return res.status(204).send()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao excluir categoria' })
    }
  }
}
