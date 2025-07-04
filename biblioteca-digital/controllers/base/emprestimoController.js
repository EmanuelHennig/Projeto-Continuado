const Emprestimo = require('../../models/emprestimo')
const Usuario    = require('../../models/usuario')
const Livro      = require('../../models/livro')

module.exports = {
  getCreate: async (req, res) => {
    const usuarios = await Usuario.find()
    const livros   = await Livro.find()
    res.render('emprestimo/emprestimoCreate', { usuarios, livros })
  },

  postCreate: async (req, res) => {
    try {
      await new Emprestimo(req.body).save()
      res.redirect('/emprestimoList')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao criar empréstimo')
    }
  },

  getList: async (req, res) => {
    try {
      const emprestimos = await Emprestimo.find()
        .populate('usuario')
        .populate('livro')
      res.render('emprestimo/emprestimoList', { emprestimos })
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao listar empréstimos')
    }
  },

  getUpdate: async (req, res) => {
    const emprestimo = await Emprestimo.findById(req.params.id)
    const usuarios   = await Usuario.find()
    const livros     = await Livro.find()
    res.render('emprestimo/emprestimoUpdate', {
      emprestimo, usuarios, livros
    })
  },

  postUpdate: async (req, res) => {
    try {
      await Emprestimo.findByIdAndUpdate(req.body.id, req.body)
      res.redirect('/emprestimoList')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao atualizar empréstimo')
    }
  },

  getDelete: async (req, res) => {
    try {
      await Emprestimo.findByIdAndDelete(req.params.id)
      res.redirect('/emprestimoList')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao excluir empréstimo')
    }
  }
}
