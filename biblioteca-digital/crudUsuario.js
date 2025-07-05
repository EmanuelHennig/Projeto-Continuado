const db = require('./config/db');
const Usuario = db.Usuario;

async function testarCRUD() {
  await db.sequelize.sync({ force: true }); 

  await Usuario.create({ login: 'emanuel', senha: '1234' });
  await Usuario.create({ login: 'sabrina', senha: '1237' });
  await Usuario.create({ login: 'ariana', senha: '1236' });
  await Usuario.create({ login: 'charlie', senha: '1235' });
  await Usuario.create({ login: 'beyonce', senha: '1233' });
  await Usuario.create({ login: 'katy perry', senha: '1231' });
  await Usuario.create({ login: 'billie', senha: '1232' });

  const usuarios = await Usuario.findAll();
  console.log("Todos os usuários:");
  console.log(usuarios.map(u => u.toJSON()));

  const usuario = await Usuario.findByPk(1);
  usuario.senha = 'novaSenha123';
  await usuario.save();

  console.log("Usuário atualizado:");
  console.log(usuario.toJSON());
}

testarCRUD();
