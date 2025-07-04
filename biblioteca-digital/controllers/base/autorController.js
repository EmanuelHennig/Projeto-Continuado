// controllers/base/autorController.js
const Autor = require('../../models/autor');
const Livro = require('../../models/livro');

module.exports = {
  getCreate: (req, res) => {
    res.render('autor/autorCreate')
  },

  postCreate: async (req, res) => {
    try {
      await new Autor(req.body).save()
      res.redirect('/autor/list')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao criar autor')
    }
  },

  getList: async (req, res) => {
    try {
      // <-- .lean() aqui
      const autores = await Autor.find().lean()
      console.log('→ autores encontrados:', autores)
      res.render('autor/autorList', { autores })
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao listar autores')
    }
  },

  getUpdate: async (req, res) => {
    // também lean() aqui se for usar campos no template
    const autor = await Autor.findById(req.params.id).lean()
    res.render('autor/autorUpdate', { autor })
  },

  postUpdate: async (req, res) => {
    try {
      await Autor.findByIdAndUpdate(req.body.id, req.body)
      res.redirect('/autor/list')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao atualizar autor')
    }
  },

  getDelete: async (req, res) => {
    try {
      await Autor.findByIdAndDelete(req.params.id)
      res.redirect('/autor/list')
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao excluir autor')
    }
  },

  getBooks: async (req, res) => {
    try {
      const autores = await Autor.find().lean();
      const autoresComLivros = await Promise.all(autores.map(async autor => {
        const livros = await Livro.find({ autores: autor._id }).lean();
        return { ...autor, livros };
      }));
      res.render('autor/autorLivros', { autores: autoresComLivros });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao listar livros por autor');
    }
  }

}
