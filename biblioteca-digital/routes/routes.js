// routes/routes.js
const express               = require('express');
const multer                = require('multer');
const path                  = require('path');
const router                = express.Router();

// controllers HTML
const usuarioController     = require('../controllers/base/usuarioController');
const categoriaController   = require('../controllers/base/categoriaController');
const livroController       = require('../controllers/base/livroController');
const autorController       = require('../controllers/base/autorController');
const emprestimoController  = require('../controllers/base/emprestimoController');
const logUsuarioController  = require('../controllers/base/logUsuarioController');

// configuração do Multer para uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename:    (req, file, cb) => {
    const name = (req.body.titulo || `capa-${Date.now()}`)
      .replace(/\s+/g, '_');
    cb(null, name + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// rota de login e home
router.get ('/',                  (req, res) => res.render('usuario/usuarioLogin', { layout: 'noMenu' }));
router.post('/usuarioLogin',      usuarioController.postLogin);
router.get ('/logout',            usuarioController.getLogout);
router.get ('/home',              (req, res) => {
  if (req.session.login) return res.render('home');
  res.redirect('/');
});

// CRUD Usuários
router.get ('/usuarioCreate',     usuarioController.getCreate);
router.post('/usuarioCreate',     usuarioController.postCreate);
router.get ('/usuarioList',       usuarioController.getList);
router.get ('/usuarioUpdate/:id', usuarioController.getUpdate);
router.post('/usuarioUpdate',     usuarioController.postUpdate);
router.get ('/usuarioDelete/:id', usuarioController.getDelete);


// CRUD Categorias
router.get ('/categoriaCreate',     categoriaController.getCreate);
router.post('/categoriaCreate',     categoriaController.postCreate);
router.get ('/categoriaList',       categoriaController.getList);
router.get ('/categoriaUpdate/:id', categoriaController.getUpdate);
router.post('/categoriaUpdate',     categoriaController.postUpdate);
router.get ('/categoriaDelete/:id', categoriaController.getDelete);

// CRUD Livros
router.get ('/livro/create',       livroController.getCreate);
router.post('/livro/create',       upload.single('imagem'), livroController.create);
router.get ('/livro/list',         livroController.getList);
router.get ('/livro/update/:id',   livroController.getUpdate);
router.post('/livro/update/:id',   upload.single('imagem'), livroController.update);
router.post('/livro/delete/:id',   livroController.delete);

// CRUD Autores
router.get ('/autor/create',       autorController.getCreate);
router.post('/autor/create',       autorController.postCreate);
router.get ('/autor/list',         autorController.getList);
router.get ('/autor/update/:id',   autorController.getUpdate);
router.post('/autor/update/:id',   autorController.postUpdate);
router.get ('/autor/delete/:id',   autorController.getDelete);
router.get ('/autor/livros',       autorController.getBooks);

// CRUD Empréstimos
router.get ('/emprestimo/create',      emprestimoController.getCreate);
router.post('/emprestimo/create',      emprestimoController.postCreate);
router.get ('/emprestimo/list',        emprestimoController.getList);
router.get ('/emprestimo/update/:id',  emprestimoController.getUpdate);
router.post('/emprestimo/update/:id',  emprestimoController.postUpdate);
router.get ('/emprestimo/delete/:id',  emprestimoController.getDelete);

// Logs de Usuário
router.get ('/logUsuario/list',        logUsuarioController.getList);

module.exports = router;
