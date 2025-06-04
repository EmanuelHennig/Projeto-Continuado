module.exports = {
    logRegister(req, res, next) {
        const now = new Date().toISOString();
        console.log(`[${now}] ${req.method} ${req.originalUrl}`);
        next();
    },

    sessionControl(req, res, next) {
        if (req.session.login != undefined) {
            next();
        } else if (req.url === '/' && req.method === 'GET') {
            next();
        } else if (req.url === '/usuarioLogin' && req.method === 'POST') { // Permitir login
            next();
        } else {
            res.redirect('/');
        }
    }
};
