// controllers/comentarioController.js
const Comentario = require('../../models/comentario');

module.exports = {
    getCreate(req, res) {
        res.render('comentario/comentarioCreate');
    },

    postCreate(req, res) {
        Comentario.create({
            titulo: req.body.titulo,
            texto: req.body.texto,
            autor: req.body.autor
        })
            .then(() => res.redirect('/comentarioList'))
            .catch(err => {
                console.error('Erro ao criar comentário (Mongo):', err);
                res.redirect('/comentarioCreate');
            });
    },

    getList(req, res) {
        Comentario.find().lean()
            .then(comentarios => {
                console.log('Comentários no Mongo (plain):', comentarios);
                res.render('comentario/comentarioList', { comentarios });
            })
            .catch(err => {
                console.error('Erro ao listar comentários (Mongo):', err);
                res.redirect('/');
            });
    },

    getUpdate(req, res) {
        Comentario.findById(req.params.id)
            .then(c => {
                res.render('comentario/comentarioUpdate', {
                    comentario: {
                        id: c._id,
                        titulo: c.titulo,
                        texto: c.texto,
                        autor: c.autor
                    }
                });
            })
            .catch(() => res.redirect('/comentarioList'));
    },

    postUpdate(req, res) {
        Comentario.findByIdAndUpdate(req.body.id, {
            titulo: req.body.titulo,
            texto: req.body.texto,
            autor: req.body.autor
        })
            .then(() => res.redirect('/comentarioList'))
            .catch(() => res.redirect('/comentarioList'));
    },

    getDelete(req, res) {
        Comentario.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('/comentarioList'))
            .catch(() => res.redirect('/comentarioList'));
    }
};
