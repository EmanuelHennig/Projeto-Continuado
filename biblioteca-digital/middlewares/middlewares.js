module.exports = {
  logRegister(req, res, next) {
    console.log(req.url, req.method, new Date());
    next();
  },
  sessionControl(req, res, next) {

    if (req.session.login) {
      next();
    }
    else if (req.path === '/' && req.method === 'GET') {
      next();
    }
    else if (req.path === '/login' && req.method === 'POST') {
      next();
    }
    else if (req.path.startsWith('/recuperarSenha')) {
      next();
    }
    else {
      res.redirect('/');
    }
  }
};
