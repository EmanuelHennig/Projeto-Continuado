const express              = require('express');
const multer               = require('multer');
const path                 = require('path');
const router               = express.Router();

const usuarioController    = require('../controllers/base/usuarioController');
const categoriaController  = require('../controllers/base/categoriaController');
const livroController      = require('../controllers/base/livroController');
const autorController      = require('../controllers/base/autorController');
const emprestimoController  = require('../controllers/base/emprestimoController')
const logUsuarioController = require('../controllers/base/logUsuarioController');

const { logRegister, sessionControl, adminOnly } = require('../middlewares/middlewares');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename:    (req, file, cb) => {
    const name = (req.body.titulo || `capa-${Date.now()}`).replace(/\s+/g, '_');
    cb(null, name + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.use(logRegister);
router.use(sessionControl);

router.get ('/',             (req, res) => res.render('usuario/usuarioLogin', { layout: 'noMenu' }));
router.post('/usuarioLogin', usuarioController.postLogin);
router.get ('/logout',       usuarioController.getLogout);
router.get ('/home',         (req, res) => req.session.login ? res.render('home') : res.redirect('/'));

router.get ('/usuarioList',         usuarioController.getList);
router.get ('/usuarioCreate',  adminOnly, usuarioController.getCreate);
router.post('/usuarioCreate',  adminOnly, usuarioController.postCreate);
router.get ('/usuarioUpdate/:id', adminOnly, usuarioController.getUpdate);
router.post('/usuarioUpdate',   adminOnly, usuarioController.postUpdate);
router.get ('/usuarioDelete/:id',adminOnly, usuarioController.getDelete);

router.get ('/categoriaList',         categoriaController.getList);
router.get ('/categoriaCreate', adminOnly, categoriaController.getCreate);
router.post('/categoriaCreate', adminOnly, categoriaController.postCreate);
router.get ('/categoriaUpdate/:id', adminOnly, categoriaController.getUpdate);
router.post('/categoriaUpdate', adminOnly, categoriaController.postUpdate);
router.get ('/categoriaDelete/:id',adminOnly, categoriaController.getDelete);

router.get ('/livro/list',        livroController.getList);
router.get ('/livro/create',  adminOnly, livroController.getCreate);
router.post('/livro/create',  adminOnly, upload.single('imagem'), livroController.create);
router.get ('/livro/update/:id',adminOnly, livroController.getUpdate);
router.post('/livro/update/:id',adminOnly, upload.single('imagem'), livroController.update);
router.post('/livro/delete/:id',adminOnly, livroController.delete);

router.get ('/autor/list',         autorController.getList);
router.get ('/autor/create',  adminOnly, autorController.getCreate);
router.post('/autor/create',  adminOnly, autorController.postCreate);
router.get ('/autor/update/:id',adminOnly, autorController.getUpdate);
router.post('/autor/update/:id',adminOnly, autorController.postUpdate);
router.get ('/autor/delete/:id',adminOnly, autorController.getDelete);
router.get ('/autor/livros',       autorController.getBooks);

router.get  ('/emprestimo/list',     emprestimoController.getList)
router.get  ('/emprestimo/create',   emprestimoController.getCreate)
router.post ('/emprestimo/create',   emprestimoController.create)
router.get  ('/emprestimo/update/:id', emprestimoController.getUpdate)
router.post ('/emprestimo/update/:id', emprestimoController.update)
router.get  ('/emprestimo/delete/:id', emprestimoController.delete)

router.get ('/logUsuario/list', logUsuarioController.getList);

module.exports = router;
