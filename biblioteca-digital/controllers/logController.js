const mongoose = require('mongoose');
const db_mongoose = require('../config/db_mongoose');
const LogUsuario = require('../models/noSql/logUsuario');

mongoose.connect(db_mongoose.connection)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(() => console.log('Erro na conexão com o MongoDB.'));

module.exports = {
  async getCreate(req, res) {
    res.render('log/logCreate');
  },

  async postCreate(req, res) {
    await new LogUsuario(req.body).save();
    res.redirect('/logList');
  },

  async getList(req, res) {
    const logs = await LogUsuario.find();
    res.render('log/logList', {
      logs: logs.map(log => log.toJSON())
    });
  }
};
