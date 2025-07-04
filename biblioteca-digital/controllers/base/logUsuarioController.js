const LogUsuario = require('../../models/logUsuario')

module.exports = {
  getList: async (req, res) => {
    try {
      const logs = await LogUsuario.find().populate('usuario').populate('livro')
      res.render('logUsuario/logUsuarioList', { logs })
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao listar logs de usuário')
    }
  },
}
