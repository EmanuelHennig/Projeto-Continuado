const Autor = require('../../models/autor')

module.exports = {
  async getAll(req, res) {
    try {
      const lista = await Autor.find()
      return res.status(200).json(lista)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao listar autores' })
    }
  },

  async getById(req, res) {
    try {
      const item = await Autor.findById(req.params.id)
      if (!item) {
        return res.status(404).json({ error: 'autor não encontrado' })
      }
      return res.status(200).json(item)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao obter autor' })
    }
  },

  async create(req, res) {
    try {
      const novo = new Autor(req.body)
      await novo.save()
      return res.status(201).json(novo)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao criar autor' })
    }
  },

  async update(req, res) {
    try {
      const atualizado = await Autor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      if (!atualizado) {
        return res.status(404).json({ error: 'autor não encontrado' })
      }
      return res.status(200).json(atualizado)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao atualizar autor' })
    }
  },

  async remove(req, res) {
    try {
      const excluido = await Autor.findByIdAndDelete(req.params.id)
      if (!excluido) {
        return res.status(404).json({ error: 'autor não encontrado' })
      }
      return res.status(204).send()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao excluir autor' })
    }
  }
}
