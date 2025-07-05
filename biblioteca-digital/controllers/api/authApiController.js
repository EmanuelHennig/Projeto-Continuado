const jwt    = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Usuario = require('../../models/usuario')
const secret = process.env.JWT_SECRET

module.exports = {

  async login(req, res) {
    try {
      const { login, senha } = req.body

      const user = await Usuario.findOne({ login })
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }

      const ok = await bcrypt.compare(senha, user.senha)
      if (!ok) {
        return res.status(401).json({ error: 'Senha incorreta' })
      }
    
      const payload = { id: user._id, login: user.login }
      const token = jwt.sign(payload, secret, { expiresIn: '1h' })
      return res.status(200).json({ token })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao fazer login' })
    }
  }
}
