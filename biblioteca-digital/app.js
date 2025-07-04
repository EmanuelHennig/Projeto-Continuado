require('dotenv').config()
const express           = require('express')
const mongoose          = require('mongoose')
const cors              = require('cors')
const exphbs            = require('express-handlebars')
const cookieParser      = require('cookie-parser')
const session           = require('express-session')
const path              = require('path')
const middlewares       = require('./middlewares/middlewares')
const swaggerUI         = require('swagger-ui-express')
const swaggerDocument   = require('./swagger.json')

//const jsonServerRoutes  = require('./routes/jsonServerRoutes')
const apiRoutes         = require('./routes/apiRoutes')
const routes            = require('./routes/routes')

const app = express()

// — Conexão MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✔ MongoDB conectado'))
.catch(err => console.error('✖ Erro MongoDB:', err))

// — Middlewares básicos
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET || 'uma_chave_super_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 30 * 60e3 }
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// — View engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// — Middlewares customizados
app.use(middlewares.logRegister)
app.use(middlewares.sessionControl)

// — Swagger UI
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, { explorer: true })
)

// — Rotas JSON-Server (Capítulo 17)
//app.use(jsonServerRoutes)

// — Rotas da sua API REST (protegidas / não protegidas via JWT)
app.use('/api', apiRoutes)

// — Rotas HTML
app.use(routes)

app.listen(8081, () => {
  console.log('Servidor rodando em http://localhost:8081')
})
