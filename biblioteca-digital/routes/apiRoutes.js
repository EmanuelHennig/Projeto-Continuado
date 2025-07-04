// routes/apiRoutes.js
const express = require('express');
const router  = express.Router();

const usuarioApi    = require('../controllers/api/usuarioApiController');
const categoriaApi  = require('../controllers/api/categoriaApiController');
const livroApi      = require('../controllers/api/livroApiController');
const autorApi      = require('../controllers/api/autorApiController');
const emprestimoApi = require('../controllers/api/emprestimoApiController');
const logUsuarioApi = require('../controllers/api/logUsuarioApiController');

// Usuários
router.get   ('/usuarios',     usuarioApi.getAll);
router.get   ('/usuarios/:id', usuarioApi.getById);
router.post  ('/usuarios',     usuarioApi.create);
router.put   ('/usuarios/:id', usuarioApi.update);
router.delete('/usuarios/:id', usuarioApi.remove);

// Categorias
router.get   ('/categorias',     categoriaApi.getAll);
router.get   ('/categorias/:id', categoriaApi.getById);
router.post  ('/categorias',     categoriaApi.create);
router.put   ('/categorias/:id', categoriaApi.update);
router.delete('/categorias/:id', categoriaApi.remove);

// Livros
router.get   ('/livros',     livroApi.getAll);
router.get   ('/livros/:id', livroApi.getById);
router.post  ('/livros',     livroApi.create);
router.put   ('/livros/:id', livroApi.update);
router.delete('/livros/:id', livroApi.remove);

// Autores
router.get   ('/autores',     autorApi.getAll);
router.get   ('/autores/:id', autorApi.getById);
router.post  ('/autores',     autorApi.create);
router.put   ('/autores/:id', autorApi.update);
router.delete('/autores/:id', autorApi.remove);

// Empréstimos
router.get   ('/emprestimos',     emprestimoApi.getAll);
router.get   ('/emprestimos/:id', emprestimoApi.getById);
router.post  ('/emprestimos',     emprestimoApi.create);
router.put   ('/emprestimos/:id', emprestimoApi.update);
router.delete('/emprestimos/:id', emprestimoApi.remove);

// Logs de Usuário
router.get('/logs-usuarios',     logUsuarioApi.getAll);
router.get('/logs-usuarios/:id', logUsuarioApi.getById);

module.exports = router;
