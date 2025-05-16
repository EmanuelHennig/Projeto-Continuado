const db = require('./config/db');

async function testarRelacionamento() {
  await db.sequelize.sync({ force: true });

  // Criar leitor
  const leitor = await db.Leitor.create({
    nome: 'Emanuel',
    email: 'emanuel@gmail.com'
  });

  // Criar empréstimos vinculados ao leitor criado
  await db.Emprestimo.create({
    livro: 'Clean Code',
    data_emprestimo: new Date(),
    leitorId: leitor.id // vínculo com o leitor criado acima
  });

  await db.Emprestimo.create({
    livro: 'JavaScript Avançado',
    data_emprestimo: new Date(),
    leitorId: leitor.id
  });

  // Consultar leitor com empréstimos associados
  const resultado = await db.Leitor.findOne({
    where: { id: leitor.id },
    include: [db.Emprestimo]
  });

  console.log(JSON.stringify(resultado, null, 2));

}

testarRelacionamento();
