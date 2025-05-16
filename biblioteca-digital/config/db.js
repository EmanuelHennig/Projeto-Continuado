const Sequelize = require('sequelize');
const sequelize = new Sequelize('biblioteca_db', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Usuario = require('../models/usuario')(sequelize, Sequelize);
db.Leitor = require('../models/leitor')(sequelize, Sequelize);
db.Emprestimo = require('../models/emprestimo')(sequelize, Sequelize);

// Relacionamentos
db.Leitor.hasMany(db.Emprestimo);          // 1 leitor → vários empréstimos
db.Emprestimo.belongsTo(db.Leitor);        // cada empréstimo → 1 leitor

module.exports = db;
