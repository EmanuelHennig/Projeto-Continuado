const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const middlewares = require ('./middlewares/middlewares');


const app = express();

app.use(cookieParser());
app.use(session({
  secret: 'segredo_super_secreto',
  resave: false,
  saveUninitialized: false, 
  cookie: { maxAge: 30 * 60 * 1000 }
}));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'uma_chave_secreta_qualquer',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,     
    maxAge: 30 * 60e3    
  }
}));

 app.use(middlewares.logRegister);
 app.use(middlewares.sessionControl);
 app.use(routes);

app.listen(8081, () => {
  console.log("Servidor rodando em http://localhost:8081");
});

