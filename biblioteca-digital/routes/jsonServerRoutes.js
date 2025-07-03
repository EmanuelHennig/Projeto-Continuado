const express = require('express')
const router = express.Router()

// exibe a página com instruções de uso do JSON-Server
router.get('/json-server', (req, res) => {
  res.render('jsonServer')
})

module.exports = router
