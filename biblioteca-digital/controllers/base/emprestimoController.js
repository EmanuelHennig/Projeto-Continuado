const db = require('../../config/db');

module.exports = {
  async getCreate(req, res) {
    const leitores = await db.Leitor.findAll();
    res.render('emprestimo/emprestimoCreate', {
      leitores: leitores.map(leitor => leitor.toJSON())
    });
  },

  async postCreate(req, res) {
    await db.Emprestimo.create(req.body);
    res.redirect('/emprestimoList');
  },

  async getList(req, res) {
    const emprestimos = await db.Emprestimo.findAll({
      include: [db.Leitor]
    });

    res.render('emprestimo/emprestimoList', {
      emprestimos: emprestimos.map(e => ({
        ...e.toJSON(),
        nomeLeitor: e.leitor ? e.leitor.nome : 'Desconhecido'
      }))
    });
  },

  async getUpdate(req, res) {
    const emprestimo = await db.Emprestimo.findByPk(req.params.id);
    const leitores = await db.Leitor.findAll();
    res.render('emprestimo/emprestimoUpdate', {
      emprestimo: emprestimo.toJSON(),
      leitores: leitores.map(l => l.toJSON())
    });
  },

  async postUpdate(req, res) {
    await db.Emprestimo.update(req.body, {
      where: { id: req.body.id }
    });
    res.redirect('/emprestimoList');
  },

  async getDelete(req, res) {
    await db.Emprestimo.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/emprestimoList');
  }
};
