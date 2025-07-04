const LogUsuario = require('../../models/logUsuario')

module.exports = {
  async getAll(req, res) {
    try {
      const lista = await LogUsuario.find()
        .populate('usuario')
        .populate('livro')
      return res.status(200).json(lista)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao listar logs' })
    }
  },

  async getById(req, res) {
    try {
      const item = await LogUsuario.findById(req.params.id)
        .populate('usuario')
        .populate('livro')
      if (!item) {
        return res.status(404).json({ error: 'log não encontrado' })
      }
      return res.status(200).json(item)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'falha ao obter log' })
    }
  }
}
