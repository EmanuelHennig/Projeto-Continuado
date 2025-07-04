// middlewares/authenticateToken.js
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)  // não autorizado

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403)   // proibido
    req.user = user
    next()
  })
}
