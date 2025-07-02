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
db.Comentario = require('../models/comentario')(sequelize, Sequelize);

sequelize
  .sync({ alter: true })    // ajusta a estrutura sem perder dados
  .then(() => console.log('✅ Tabelas sincronizadas'))
  .catch(err => console.error('❌ Erro ao sincronizar tabelas:', err));

// Relacionamentos
db.Leitor.hasMany(db.Emprestimo);          // 1 leitor → vários empréstimos
db.Emprestimo.belongsTo(db.Leitor);        // cada empréstimo → 1 leitor

module.exports = db;
