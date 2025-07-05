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

  const leitoresPaginados = await db.Leitor.findAll({
  offset: 0, 
  limit: 10  
});

console.log("Leitores paginados:");
console.log(leitoresPaginados.map(l => l.toJSON()));

const leitoresOrdenados = await db.Leitor.findAll({
  order: [["nome", "DESC"]] 
});

console.log("Leitores ordenados por nome:");
console.log(leitoresOrdenados.map(l => l.toJSON()));

const leitoresFiltrados = await db.Leitor.findAll({
  where: {
    nome: 'Emanuel'
  }
});

console.log("Leitores filtrados:");
console.log(leitoresFiltrados.map(l => l.toJSON()));

const leitores = await db.Leitor.findAll({
  where: {
    id: {
      [Op.gt]: 1 
    }
  }
});

const leitoresComNome = await db.Leitor.findAll({
  where: {
    nome: {
      [Op.like]: '%man%'  
    }
  }
});

}

testarRelacionamento();
