const Emprestimo = require('../../models/emprestimo')
const Usuario    = require('../../models/usuario')
const Livro      = require('../../models/livro')

module.exports = {

  getCreate: async (req, res) => {
    try {
      const livros   = await Livro.find().lean()
      const usuarios = await Usuario.find().lean()
      res.render('emprestimo/emprestimoCreate', { livros, usuarios })
    } catch (err) {
      console.error('Erro ao carregar criação de empréstimo:', err)
      res.status(500).send('Erro ao carregar cadastro de empréstimo')
    }
  },

  create: async (req, res) => {
    try {
      const { livro, usuario, data_emprestimo, data_devolucao_prevista } = req.body

      await new Emprestimo({
        livro,
        usuario,
        data_emprestimo,
        data_devolucao_prevista
      }).save()

      await Livro.findByIdAndUpdate(livro, { status: 'emprestado' })

      res.redirect('/emprestimo/list')
    } catch (err) {
      console.error('Erro ao registrar empréstimo:', err)
      res.status(500).send('Erro ao registrar empréstimo')
    }
  },

  getList: async (req, res) => {
    try {
      const emprestimos = await Emprestimo.find()
        .populate('usuario')
        .populate('livro')
        .lean()
      res.render('emprestimo/emprestimoList', { emprestimos })
    } catch (err) {
      console.error('Erro ao listar empréstimos:', err)
      res.status(500).send('Erro ao listar empréstimos')
    }
  },

  getUpdate: async (req, res) => {
    try {
      const { id } = req.params
      const emprestimo = await Emprestimo.findById(id).lean()
      const livros     = await Livro.find().lean()
      const usuarios   = await Usuario.find().lean()
      res.render('emprestimo/emprestimoUpdate', {
        emprestimo,
        livros,
        usuarios
      })
    } catch (err) {
      console.error('Erro ao carregar edição de empréstimo:', err)
      res.status(500).send('Erro ao carregar edição de empréstimo')
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params
      const { livro, usuario, data_emprestimo, data_devolucao_prevista } = req.body

      await Emprestimo.findByIdAndUpdate(id, {
        livro,
        usuario,
        data_emprestimo,
        data_devolucao_prevista
      })

      res.redirect('/emprestimo/list')
    } catch (err) {
      console.error('Erro ao atualizar empréstimo:', err)
      res.status(500).send('Erro ao atualizar empréstimo')
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params
      await Emprestimo.findByIdAndDelete(id)
      res.redirect('/emprestimo/list')
    } catch (err) {
      console.error('Erro ao excluir empréstimo:', err)
      res.status(500).send('Erro ao excluir empréstimo')
    }
  }
}
