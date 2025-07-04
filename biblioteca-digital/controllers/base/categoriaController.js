// controllers/base/categoriaController.js
const Categoria = require('../../models/categoria');

module.exports = {
  // Exibe o formulário de criação de categoria
  getCreate: (req, res) => {
    res.render('categoria/categoriaCreate');
  },

  // Processa o cadastro de uma nova categoria
  postCreate: async (req, res) => {
    try {
      await new Categoria(req.body).save();
      res.redirect('/categoriaList');
    } catch (err) {
      console.error('Erro ao criar categoria:', err);
      res.status(500).send('Erro ao criar categoria');
    }
  },

  // Exibe a lista de categorias
  getList: async (req, res) => {
    try {
      const categorias = await Categoria.find().lean();
      console.log('→ categorias encontradas:', categorias);
      res.render('categoria/categoriaList', { categorias });
    } catch (err) {
      console.error('Erro ao listar categorias:', err);
      res.status(500).send('Erro ao listar categorias');
    }
  },

  // Exibe o formulário de edição, carregando a categoria pelo ID
  getUpdate: async (req, res) => {
    try {
      const categoria = await Categoria.findById(req.params.id).lean();
      if (!categoria) {
        return res.status(404).send('Categoria não encontrada');
      }
      res.render('categoria/categoriaUpdate', { categoria });
    } catch (err) {
      console.error('Erro ao carregar categoria para edição:', err);
      res.status(500).send('Erro ao carregar categoria para edição');
    }
  },

  // Processa a atualização de uma categoria existente
  postUpdate: async (req, res) => {
    try {
      const { id, nome } = req.body;
      await Categoria.findByIdAndUpdate(id, { nome });
      res.redirect('/categoriaList');
    } catch (err) {
      console.error('Erro ao atualizar categoria:', err);
      res.status(500).send('Erro ao atualizar categoria');
    }
  },

  // Exclui uma categoria pelo ID
  getDelete: async (req, res) => {
    try {
      await Categoria.findByIdAndDelete(req.params.id);
      res.redirect('/categoriaList');
    } catch (err) {
      console.error('Erro ao excluir categoria:', err);
      res.status(500).send('Erro ao excluir categoria');
    }
  }
};
