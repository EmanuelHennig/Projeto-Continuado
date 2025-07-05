const express = require('express')
const router = express.Router()

router.get('/json-server', (req, res) => {
  res.render('jsonServer')
})

module.exports = router
