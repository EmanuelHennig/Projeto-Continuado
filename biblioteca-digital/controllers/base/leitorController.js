const db = require('../../config/db');

module.exports = {
  async getCreate(req, res) {
    res.render('leitor/leitorCreate');
  },

  async postCreate(req, res) {
    await db.Leitor.create(req.body);
    res.redirect('/leitorList');
  },

  async getList(req, res) {
    const leitores = await db.Leitor.findAll();
    res.render('leitor/leitorList', {
      leitores: leitores.map(leitor => leitor.toJSON())
    });
  },

  async getUpdate(req, res) {
    const leitor = await db.Leitor.findByPk(req.params.id);
    res.render('leitor/leitorUpdate', { leitor: leitor.toJSON() });
  },

  async postUpdate(req, res) {
    await db.Leitor.update(req.body, {
      where: { id: req.body.id }
    });
    res.redirect('/leitorList');
  },

  async getDelete(req, res) {
    await db.Leitor.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/leitorList');
  }
};
