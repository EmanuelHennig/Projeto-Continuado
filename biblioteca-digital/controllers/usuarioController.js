const db = require('../config/db');

module.exports = {
  async getCreate(req, res) {
    res.render('usuario/usuarioCreate');
  },

  async postCreate(req, res) {
    await db.Usuario.create(req.body);
    res.redirect('/usuarioList');
  },

  async getList(req, res) {
    const usuarios = await db.Usuario.findAll();
    res.render('usuario/usuarioList', {
      usuarios: usuarios.map(user => user.toJSON())
    });
  },

  async getUpdate(req, res) {
    const usuario = await db.Usuario.findByPk(req.params.id);
    res.render('usuario/usuarioUpdate', { usuario: usuario.toJSON() });
  },

  async postUpdate(req, res) {
    await db.Usuario.update(req.body, {
      where: { id: req.body.id }
    });
    res.redirect('/usuarioList');
  },

  async getDelete(req, res) {
    await db.Usuario.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/usuarioList');
  }
};
