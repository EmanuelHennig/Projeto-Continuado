require('dotenv').config()
const express         = require('express')
const mongoose        = require('mongoose')
const cors            = require('cors')
const exphbs          = require('express-handlebars')
const cookieParser    = require('cookie-parser')
const session         = require('express-session')
const path            = require('path')
const middlewares     = require('./middlewares/middlewares')
const swaggerUI       = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const apiRoutes = require('./routes/apiRoutes')
const routes     = require('./routes/routes')

const app = express()

// 1. Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  // opções padrão no Mongoose 6+
})
  .then(() => console.log('✔ MongoDB conectado'))
  .catch(err => console.error('✖ Erro MongoDB:', err))

// 2. Middlewares
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 30 * 60e3 }
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// 3. Configuração de views para arquivos .handlebars
const viewsPath = path.join(__dirname, 'views')
app.set('views', viewsPath)

const hbs = exphbs.create({
  extname: '.handlebars',               
  defaultLayout: 'main',
  layoutsDir:  path.join(viewsPath, 'layouts'),
  partialsDir: path.join(viewsPath, 'partials'),
  helpers: {
    eq:       (a, b) => String(a) === String(b),
    includes: (arr, val) => Array.isArray(arr) && arr.includes(val)
  }
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// 4. Logging e controle de sessão
app.use(middlewares.logRegister)
app.use(middlewares.sessionControl)

// 5. Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, { explorer: true }))

// 6. Rotas
app.use('/api', apiRoutes)
app.use(routes)

// 7. 404 handler
app.use((req, res) => res.status(404).render('404'))

// 8. Start
const PORT = process.env.PORT || 8081
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
