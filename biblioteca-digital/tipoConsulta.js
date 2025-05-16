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

  //PAGINAÇÃO
  const leitoresPaginados = await db.Leitor.findAll({
  offset: 0, // começa do primeiro
  limit: 10  // pega só 10 leitores
});

console.log("Leitores paginados:");
console.log(leitoresPaginados.map(l => l.toJSON()));

//ORDENAÇÃO
const leitoresOrdenados = await db.Leitor.findAll({
  order: [["nome", "DESC"]] // DESC: decrescente | ASC: crescente
});

console.log("Leitores ordenados por nome:");
console.log(leitoresOrdenados.map(l => l.toJSON()));

//CONSULTA COM WHERE
const leitoresFiltrados = await db.Leitor.findAll({
  where: {
    nome: 'Emanuel'
  }
});

console.log("Leitores filtrados:");
console.log(leitoresFiltrados.map(l => l.toJSON()));

//CONSULTA COM MENOR/MAIOR QUE
const leitores = await db.Leitor.findAll({
  where: {
    id: {
      [Op.gt]: 1  // "gt" = greater than = maior que
    }
  }
});

//CONSULTA COM OPERADORES DE TEXTO
const leitoresComNome = await db.Leitor.findAll({
  where: {
    nome: {
      [Op.like]: '%man%'  // nomes que contêm "man"
    }
  }
});

}

testarRelacionamento();
