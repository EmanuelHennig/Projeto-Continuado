// middlewares/middlewares.js

module.exports = {
  logRegister,
  sessionControl,
  adminOnly
};

/**
 * Registra cada requisição no console.
 */
function logRegister(req, res, next) {
  console.log(`${req.method} ${req.url} — ${new Date().toISOString()}`);
  next();
}

/**
 * Controla acesso às rotas:
 * 1) libera todo acesso a /api/*
 * 2) se estiver logado, prossegue e marca res.locals.login / res.locals.admin
 * 3) libera rotas públicas de login/cadastro
 * 4) redireciona para login em qualquer outra rota
 */
function sessionControl(req, res, next) {
  // 1) Rota de API REST
  if (req.path.startsWith('/api')) {
    return next();
  }

  // 2) Se já autenticado
  if (req.session && req.session.login) {
    res.locals.login = true;
    // “tipo” agora é string: ’aluno’ | ’professor’ | ’admin’
    res.locals.admin = (req.session.tipo === 'admin');
    return next();
  }

  // 3) Rotas públicas
  const publicPaths = [
    { path: '/',               method: 'GET'  }, // login form
    { path: '/usuarioLogin',   method: 'POST' }, // processa login
    { path: '/usuarioCreate',  method: 'GET'  }, // form de cadastro
    { path: '/usuarioCreate',  method: 'POST' }  // processa cadastro
  ];
  if (publicPaths.some(p => p.path === req.path && p.method === req.method)) {
    return next();
  }

  // rota de recuperação de senha
  if (req.path.startsWith('/recuperarSenha')) {
    return next();
  }

  // 4) qualquer outra exige login
  return res.redirect('/');
}

/**
 * Restringe acesso apenas para admins.
 * Se não for admin, devolve 403 com view de “Acesso Negado”.
 */
function adminOnly(req, res, next) {
  if (req.session && req.session.tipo === 'admin') {
    return next();
  }
  return res.status(403).render('errors/forbidden', { layout: 'noMenu' });
}
