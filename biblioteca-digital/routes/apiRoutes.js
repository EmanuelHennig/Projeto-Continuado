const express = require('express')
const router = express.Router()
const livroApi = require('../controllers/api/livroApiController')
const leitorApi = require('../controllers/api/leitorApiController')
const emprestimoApi = require('../controllers/api/emprestimoApiController')
const comentarioApi = require('../controllers/api/comentarioApiController')
const usuarioApi = require('../controllers/api/usuarioApiController')

router.get('/livros', livroApi.getAll)
router.get('/livros/:id', livroApi.getById)
router.post('/livros', livroApi.create)
router.put('/livros/:id', livroApi.update)
router.delete('/livros/:id', livroApi.remove)

router.get('/leitores', leitorApi.getAll)
router.get('/leitores/:id', leitorApi.getById)
router.post('/leitores', leitorApi.create)
router.put('/leitores/:id', leitorApi.update)
router.delete('/leitores/:id', leitorApi.remove)

router.get('/emprestimos', emprestimoApi.getAll)
router.get('/emprestimos/:id', emprestimoApi.getById)
router.post('/emprestimos', emprestimoApi.create)
router.put('/emprestimos/:id', emprestimoApi.update)
router.delete('/emprestimos/:id', emprestimoApi.remove)

router.get('/comentarios', comentarioApi.getAll)
router.get('/comentarios/:id', comentarioApi.getById)
router.post('/comentarios', comentarioApi.create)
router.put('/comentarios/:id', comentarioApi.update)
router.delete('/comentarios/:id', comentarioApi.remove)

router.get('/usuarios', usuarioApi.getAll)
router.get('/usuarios/:id', usuarioApi.getById)
router.post('/usuarios', usuarioApi.create)
router.put('/usuarios/:id', usuarioApi.update)
router.delete('/usuarios/:id', usuarioApi.remove)

module.exports = router
