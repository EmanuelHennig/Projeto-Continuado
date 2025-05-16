const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routers/routes');
const app = express();

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configurar recebimento de dados de formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Usar rotas
app.use(routes);

// Iniciar servidor
app.listen(8081, () => {
  console.log("Servidor rodando em http://localhost:8081");
});
