const Livro     = require('../../models/livro')
const Categoria = require('../../models/categoria')

module.exports = {
  // Formulário de criação
  getCreate: async (req, res) => {
    try {
      const categorias = await Categoria.find()
      res.render('livro/livroCreate', { categorias })
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao carregar formulário de cadastro de livro')
    }
  },

  // Cria novo livro
  create: async (req, res) => {
    try {
      const capa = req.file ? req.file.filename : null
      const dados = {
        titulo:       req.body.titulo,
        autor:        req.body.autor,
        ano:          req.body.ano,
        isbn:         req.body.isbn,
        categoria_id: req.body.categoria_id,
        imagem:       capa
      }
      await new Livro(dados).save()
      res.redirect('/livro/list')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao criar livro')
    }
  },

  // Lista todos os livros
  getList: async (req, res) => {
    try {
      const livros = await Livro.find().populate('categoria_id')
      res.render('livro/livroList', { livros })
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao carregar lista de livros')
    }
  },

  // Formulário de edição
  getUpdate: async (req, res) => {
    try {
      const { id } = req.params
      const livro = await Livro.findById(id)
      const categoriasRaw = await Categoria.find()
      const categorias = categoriasRaw.map(cat => ({
        _id:      cat._id,
        nome:     cat.nome,
        selected: cat._id.toString() === livro.categoria_id.toString()
      }))
      res.render('livro/livroUpdate', { livro, categorias })
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao carregar formulário de edição de livro')
    }
  },

  // Atualiza livro existente
  update: async (req, res) => {
    try {
      const { id } = req.params
      const capa = req.file ? req.file.filename : undefined
      const dados = {
        titulo:       req.body.titulo,
        autor:        req.body.autor,
        ano:          req.body.ano,
        isbn:         req.body.isbn,
        categoria_id: req.body.categoria_id
      }
      if (capa) dados.imagem = capa
      await Livro.findByIdAndUpdate(id, dados)
      res.redirect('/livro/list')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao atualizar livro')
    }
  },

  // Exclui livro
  delete: async (req, res) => {
    try {
      const { id } = req.params
      await Livro.findByIdAndDelete(id)
      res.redirect('/livro/list')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao excluir livro')
    }
  }
}
