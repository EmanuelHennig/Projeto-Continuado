const db = require('../../config/db');

module.exports = {
  async getLogin(req, res) {
    res.render('usuario/usuarioLogin', { layout: 'noMenu' });
  },

  async postLogin(req, res) {
    const { login, senha } = req.body;

    db.Usuario.findAll({
        where: { login, senha }
    })
    .then((usuarios) => {
        if (usuarios.length > 0) {
            req.session.login = login; // Configura a sessão
            return res.redirect('/home'); // Redireciona para a página inicial
        } else {
            return res.redirect('/'); // Redireciona para a página de login
        }
    })
    .catch((err) => {
        console.log('Erro no postLogin:', err);
        return res.redirect('/');
    });
  },

  
  async getLogout(req, res) {
    req.session.destroy();
    res.redirect('/');
  },

  
  async getCreate(req, res) {
    res.render('usuario/usuarioCreate');
  },

 
  async postCreate(req, res) {
    const { login, senha } = req.body;

    db.Usuario.create({ login, senha })
      .then(() => {
        res.redirect('/usuarioList');
      })
      .catch((err) => {
        console.log('Erro no postCreate:', err);
        res.redirect('/usuarioCreate');
      });
  },

 
  async getList(req, res) {
    db.Usuario.findAll()
      .then((usuarios) => {
        res.render('usuario/usuarioList', {
          usuarios: usuarios.map((user) => user.toJSON())
        });
      })
      .catch((err) => {
        console.log('Erro no getList:', err);
        res.redirect('/home');
      });
  },

  
  async getUpdate(req, res) {
    const { id } = req.params;
    db.Usuario.findByPk(id)
      .then((usuario) => {
        if (usuario) {
          res.render('usuario/usuarioUpdate', { usuario: usuario.toJSON() });
        } else {
          res.redirect('/usuarioList');
        }
      })
      .catch((err) => {
        console.log('Erro no getUpdate:', err);
        res.redirect('/usuarioList');
      });
  },

  async postUpdate(req, res) {
    const { id, login, senha } = req.body;

    db.Usuario.update(
      { login, senha },
      { where: { id } }
    )
      .then(() => {
        res.redirect('/usuarioList');
      })
      .catch((err) => {
        console.log('Erro no postUpdate:', err);
        res.redirect('/usuarioList');
      });
  },

  async getDelete(req, res) {
    const { id } = req.params;
    db.Usuario.destroy({ where: { id } })
      .then(() => {
        res.redirect('/usuarioList');
      })
      .catch((err) => {
        console.log('Erro no getDelete:', err);
        res.redirect('/usuarioList');
      });
  }
};
