const Livro     = require('../../models/livro');
const Categoria = require('../../models/categoria');
const Autor     = require('../../models/autor');

module.exports = {

  getCreate: async (req, res) => {
    const categorias = await Categoria.find().lean();
    const autores    = await Autor.find().lean();
    res.render('livro/livroCreate', { categorias, autores });
  },

  create: async (req, res) => {
    try {
      let { titulo, editora, ano_publicacao, isbn, categoria, status } = req.body;
      let autores = req.body.autores || [];
      if (!Array.isArray(autores)) autores = [autores];
      await new Livro({ titulo, editora, ano_publicacao, isbn, categoria, status, autores }).save();
      res.redirect('/livro/list');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao criar livro');
    }
  },

  getList: async (req, res) => {
    try {
      const livros = await Livro.find()
        .populate('categoria')
        .populate('autores')
        .lean();
      res.render('livro/livroList', { livros });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao listar livros');
    }
  },

  getUpdate: async (req, res) => {
    try {
      const livro = await Livro.findById(req.params.id)
        .populate('autores')
        .lean();
      const categorias = await Categoria.find().lean();
      const autores    = await Autor.find().lean();
      res.render('livro/livroUpdate', { livro, categorias, autores });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar edição de livro');
    }
  },

  update: async (req, res) => {
    try {
      const { id, titulo, editora, ano_publicacao, isbn, categoria, status } = req.body;
      let autores = req.body.autores || [];
      if (!Array.isArray(autores)) autores = [autores];
      await Livro.findByIdAndUpdate(id, { titulo, editora, ano_publicacao, isbn, categoria, status, autores });
      res.redirect('/livro/list');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao atualizar livro');
    }
  },

  delete: async (req, res) => {
    try {
      await Livro.findByIdAndDelete(req.params.id);
      res.redirect('/livro/list');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao excluir livro');
    }
  }
};
