// controllers/api/authApiController.js
const jwt    = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Usuario = require('../../models/usuario')
const secret = process.env.JWT_SECRET

module.exports = {
  // POST /api/login
  async login(req, res) {
    try {
      const { login, senha } = req.body
      // busca usuário (ajuste o campo conforme seu modelo: login, email, etc)
      const user = await Usuario.findOne({ login })
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }
      // compara senhas (suporta hash se você já tiver integrado bcrypt no cadastro)
      const ok = await bcrypt.compare(senha, user.senha)
      if (!ok) {
        return res.status(401).json({ error: 'Senha incorreta' })
      }
      // payload básico
      const payload = { id: user._id, login: user.login }
      const token = jwt.sign(payload, secret, { expiresIn: '1h' })
      return res.status(200).json({ token })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao fazer login' })
    }
  }
}
