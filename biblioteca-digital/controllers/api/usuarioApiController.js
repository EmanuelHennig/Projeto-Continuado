const Usuario = require('../../models/usuario')

module.exports = {
  async getAll(req, res) {
    try {
      const lista = await Usuario.find()
      return res.status(200).json(lista)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao listar usuários' })
    }
  },

  async getById(req, res) {
    try {
      const item = await Usuario.findById(req.params.id)
      if (!item) {
        return res.status(404).json({ error: 'usuário não encontrado' })
      }
      return res.status(200).json(item)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao obter usuário' })
    }
  },

  async create(req, res) {
    try {
      const novo = new Usuario(req.body)
      await novo.save()
      return res.status(201).json(novo)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao criar usuário' })
    }
  },

  async update(req, res) {
    try {
      const atualizado = await Usuario.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      if (!atualizado) {
        return res.status(404).json({ error: 'usuário não encontrado' })
      }
      return res.status(200).json(atualizado)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao atualizar usuário' })
    }
  },

  async remove(req, res) {
    try {
      const excluido = await Usuario.findByIdAndDelete(req.params.id)
      if (!excluido) {
        return res.status(404).json({ error: 'usuário não encontrado' })
      }
      return res.status(204).send()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao excluir usuário' })
    }
  }
}
