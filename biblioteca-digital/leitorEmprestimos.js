const db = require('./config/db');

async function testarRelacionamento() {
  await db.sequelize.sync({ force: true });

  const leitor = await db.Leitor.create({
    nome: 'Emanuel',
    email: 'emanuel@gmail.com'
  });

  await db.Emprestimo.create({
    livro: 'Clean Code',
    data_emprestimo: new Date(),
    leitorId: leitor.id 
  });

  await db.Emprestimo.create({
    livro: 'JavaScript Avançado',
    data_emprestimo: new Date(),
    leitorId: leitor.id
  });

  const resultado = await db.Leitor.findOne({
    where: { id: leitor.id },
    include: [db.Emprestimo]
  });

  console.log(JSON.stringify(resultado, null, 2));

}

testarRelacionamento();
