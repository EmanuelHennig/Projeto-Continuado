const express = require('express');
const route = express.Router();
const controllerUsuario = require('../controllers/usuarioController');
const controllerLeitor = require('../controllers/leitorController');
const controllerEmprestimo = require('../controllers/emprestimoController');
const controllerLog = require('../controllers/logController');

// Rota inicial
route.get("/", controllerUsuario.getList);

// Rotas para usuário
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate", controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList);
route.get("/usuarioUpdate/:id", controllerUsuario.getUpdate);
route.post("/usuarioUpdate", controllerUsuario.postUpdate);
route.get("/usuarioDelete/:id", controllerUsuario.getDelete);

// Leitor
route.get("/leitorCreate", controllerLeitor.getCreate);
route.post("/leitorCreate", controllerLeitor.postCreate);
route.get("/leitorList", controllerLeitor.getList);
route.get("/leitorUpdate/:id", controllerLeitor.getUpdate);
route.post("/leitorUpdate", controllerLeitor.postUpdate);
route.get("/leitorDelete/:id", controllerLeitor.getDelete);

// Empréstimo
route.get("/emprestimoCreate", controllerEmprestimo.getCreate);
route.post("/emprestimoCreate", controllerEmprestimo.postCreate);
route.get("/emprestimoList", controllerEmprestimo.getList);
route.get("/emprestimoUpdate/:id", controllerEmprestimo.getUpdate);
route.post("/emprestimoUpdate", controllerEmprestimo.postUpdate);
route.get("/emprestimoDelete/:id", controllerEmprestimo.getDelete);

// Mongo
route.get("/logCreate", controllerLog.getCreate);
route.post("/logCreate", controllerLog.postCreate);
route.get("/logList", controllerLog.getList);

module.exports = route;
