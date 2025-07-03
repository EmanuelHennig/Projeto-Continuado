const express = require('express')
const multer = require('multer')
const path = require('path')
const route = express.Router()
const apiRoutes = require('./apiRoutes')
const controllerUsuario = require('../controllers/base/usuarioController')
const controllerLeitor = require('../controllers/base/leitorController')
const controllerEmprestimo = require('../controllers/base/emprestimoController')
const controllerLog = require('../controllers/base/logController')
const controllerComentario = require('../controllers/base/comentarioController')
const livroController = require('../controllers/base/livroController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    const name = (req.body.titulo || `capa-${Date.now()}`).replace(/\s+/g, '_')
    cb(null, name + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

route.get('/', (req, res) => {
  res.render('usuario/usuarioLogin', { layout: 'noMenu.handlebars' })
})
route.post('/usuarioLogin', controllerUsuario.postLogin)
route.get('/logout', controllerUsuario.getLogout)

route.get('/usuarioCreate', controllerUsuario.getCreate)
route.post('/usuarioCreate', controllerUsuario.postCreate)
route.get('/usuarioList', controllerUsuario.getList)
route.get('/usuarioUpdate/:id', controllerUsuario.getUpdate)
route.post('/usuarioUpdate', controllerUsuario.postUpdate)
route.get('/usuarioDelete/:id', controllerUsuario.getDelete)

route.get('/leitorCreate', controllerLeitor.getCreate)
route.post('/leitorCreate', controllerLeitor.postCreate)
route.get('/leitorList', controllerLeitor.getList)
route.get('/leitorUpdate/:id', controllerLeitor.getUpdate)
route.post('/leitorUpdate', controllerLeitor.postUpdate)
route.get('/leitorDelete/:id', controllerLeitor.getDelete)

route.get('/emprestimoCreate', controllerEmprestimo.getCreate)
route.post('/emprestimoCreate', controllerEmprestimo.postCreate)
route.get('/emprestimoList', controllerEmprestimo.getList)
route.get('/emprestimoUpdate/:id', controllerEmprestimo.getUpdate)
route.post('/emprestimoUpdate', controllerEmprestimo.postUpdate)
route.get('/emprestimoDelete/:id', controllerEmprestimo.getDelete)

route.get('/logCreate', controllerLog.getCreate)
route.post('/logCreate', controllerLog.postCreate)
route.get('/logList', controllerLog.getList)

route.get('/comentarioCreate', controllerComentario.getCreate)
route.post('/comentarioCreate', controllerComentario.postCreate)
route.get('/comentarioList', controllerComentario.getList)
route.get('/comentarioUpdate/:id', controllerComentario.getUpdate)
route.post('/comentarioUpdate', controllerComentario.postUpdate)
route.get('/comentarioDelete/:id', controllerComentario.getDelete)

route.get('/home', (req, res) => {
  if (req.session.login) {
    res.render('home')
  } else {
    res.redirect('/')
  }
})

route.get('/livro/create', livroController.getCreate)
route.post('/livro/create', upload.single('imagem'), livroController.create)
route.get('/livro/list', livroController.getList)
route.get('/livro/update/:id', livroController.getUpdate)
route.post('/livro/update/:id', upload.single('imagem'), livroController.update)
route.post('/livro/delete/:id', livroController.delete)

// inclui aqui todas as rotas /api por segurança
route.use('/api', apiRoutes)

module.exports = route
