module.exports = {
  logRegister(req, res, next) {
    console.log(req.url, req.method, new Date());
    next();
  },
  sessionControl(req, res, next) {

    if (req.session && req.session.login) {
      res.locals.login = req.session.login;
      res.locals.admin = req.session.tipo === 2;
      return next();
    }
    if (req.path === '/' && req.method === 'GET') return next();
    if (req.path === '/usuarioLogin' && req.method === 'POST') return next();
    if (req.path.startsWith('/recuperarSenha')) return next();

    return res.redirect('/');
  }
};
