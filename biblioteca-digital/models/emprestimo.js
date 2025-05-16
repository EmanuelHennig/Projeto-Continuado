module.exports = (sequelize, Sequelize) => {
  const Emprestimo = sequelize.define('emprestimo', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    livro: {
      type: Sequelize.STRING,
      allowNull: false
    },
    data_emprestimo: {
      type: Sequelize.DATE,
      allowNull: false
    },
    data_devolucao: {
      type: Sequelize.DATE,
      allowNull: true
    }
  });

  return Emprestimo;
};
