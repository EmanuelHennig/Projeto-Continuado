// controllers/base/usuarioController.js
const Usuario = require('../../models/usuario')

module.exports = {
  // Processa o login
  postLogin: async (req, res) => {
    try {
      const { email, senha } = req.body
      const user = await Usuario.findOne({ email }).lean()
      if (!user) {
        return res.render('usuario/usuarioLogin', {
          layout: 'noMenu',
          error: 'Usuário não encontrado'
        })
      }
      if (user.senha !== senha) {
        return res.render('usuario/usuarioLogin', {
          layout: 'noMenu',
          error: 'Senha incorreta'
        })
      }
      req.session.login  = true
      req.session.userId = user._id
      req.session.tipo   = user.tipo_usuario
      return res.redirect('/home')
    } catch (err) {
      console.error(err)
      return res.status(500).send('Erro ao processar login')
    }
  },

  // Faz logout destruindo a sessão
  getLogout: (req, res) => {
    req.session.destroy(err => {
      if (err) console.error(err)
      res.redirect('/')
    })
  },

  // Exibe o formulário de cadastro
  getCreate: (req, res) => {
    res.render('usuario/usuarioCreate')
  },

  // Processa o cadastro de um novo usuário
  postCreate: async (req, res) => {
    try {
      await new Usuario(req.body).save()
      res.redirect('/usuarioList')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao criar usuário')
    }
  },

  // Lista todos os usuários (usando .lean() para retornar objetos literais)
  getList: async (req, res) => {
    try {
      const usuarios = await Usuario.find().lean()
      console.log('→ usuarios encontrados:', usuarios)
      res.render('usuario/usuarioList', { usuarios })
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao listar usuários')
    }
  },

  // Exibe o formulário de edição carregando os dados do usuário
  getUpdate: async (req, res) => {
    try {
      const usuario = await Usuario.findById(req.params.id).lean()
      res.render('usuario/usuarioUpdate', { usuario })
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao carregar usuário para edição')
    }
  },

  // Processa a atualização dos dados de um usuário
  postUpdate: async (req, res) => {
    try {
      await Usuario.findByIdAndUpdate(req.body.id, req.body)
      res.redirect('/usuarioList')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao atualizar usuário')
    }
  },

  // Exclui um usuário pelo ID
  getDelete: async (req, res) => {
    try {
      await Usuario.findByIdAndDelete(req.params.id)
      res.redirect('/usuarioList')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao excluir usuário')
    }
  }
}
