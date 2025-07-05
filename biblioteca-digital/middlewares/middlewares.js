module.exports = {
  logRegister,
  sessionControl,
  adminOnly
};

function logRegister(req, res, next) {
  console.log(`${req.method} ${req.url} — ${new Date().toISOString()}`);
  next();
}

function sessionControl(req, res, next) {

  if (req.path.startsWith('/api')) {
    return next();
  }

  if (req.session && req.session.login) {
    res.locals.login = true;

    res.locals.admin = (req.session.tipo === 'admin');
    return next();
  }

  const publicPaths = [
    { path: '/',               method: 'GET'  }, 
    { path: '/usuarioLogin',   method: 'POST' }, 
    { path: '/usuarioCreate',  method: 'GET'  },
    { path: '/usuarioCreate',  method: 'POST' }  
  ];
  if (publicPaths.some(p => p.path === req.path && p.method === req.method)) {
    return next();
  }

  if (req.path.startsWith('/recuperarSenha')) {
    return next();
  }

  return res.redirect('/');
}

function adminOnly(req, res, next) {
  if (req.session && req.session.tipo === 'admin') {
    return next();
  }
  return res.status(403).render('errors/forbidden', { layout: 'noMenu' });
}
