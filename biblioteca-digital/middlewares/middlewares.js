// middlewares/middlewares.js

module.exports = {
  // Logger simples
  logRegister(req, res, next) {
    console.log(`${req.method} ${req.url} — ${new Date().toISOString()}`);
    next();
  },

  // Controle de sessão + rotas públicas
  sessionControl(req, res, next) {
    // 1) Libera toda API REST sob /api
    if (req.path.startsWith('/api')) {
      return next();
    }

    // 2) Se já estiver logado, avança
    if (req.session && req.session.login) {
      res.locals.login = req.session.login;
      res.locals.admin = req.session.tipo === 2;
      return next();
    }

    // 3) Rotas públicas (login e cadastro)
    if (
      (req.path === '/'              && req.method === 'GET')  || // exibe login
      (req.path === '/usuarioLogin'  && req.method === 'POST') || // processa login
      (req.path === '/usuarioCreate' && req.method === 'GET')  || // exibe form de cadastro
      (req.path === '/usuarioCreate' && req.method === 'POST')   // processa cadastro
    ) {
      return next();
    }

    // 4) Recuperar senha, se existir...
    if (req.path.startsWith('/recuperarSenha')) {
      return next();
    }

    // 5) Qualquer outra rota exige login
    return res.redirect('/');
  }
};
