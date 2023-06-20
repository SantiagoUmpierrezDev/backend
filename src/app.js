const express = require ('express')
const handlebars = require ('express-handlebars') 
const productsRouter = require ('./routes/products.router.js') 
const cartRouter = require ('./routes/cart.router.js') 
const viewsRouter = require ('./routes/views.router.js') 
const productIO = require ('./utils/products_io.js') 
const chatIO = require ('./utils/chat_io.js')
const objectConfig = require ('./config/objectConfig.js') 
const { Server } = require ('socket.io') 
const FileStore = require ('session-file-store')
const { create } = require('connect-mongo')
const cookieParser = require('cookie-parser')
const sessionRouter = require('./routes/session.router.js')
const session = require('express-session')

const passport = require('passport')
const { initPassport, initPassportGithub } = require('./config/passport.config.js')

const app = express()
objectConfig.connectDB()
const port = 8080;

const httpServer = app.listen(port, () => {
    console.log('Server running on port: ' + port)
})

const io = new Server(httpServer) 

app.set('views', __dirname+'/views')

const handle = handlebars.create({
    runtimeOptions:{
        allowProtoPropertiesByDefault: true
    }
})

app.engine('handlebars', handle.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname+'/public'))
app.use(cookieParser())
app.use(session({
    store: create({
        mongoUrl: 'mongodb+srv://santiagoump:backendProject@backendproject.wyi0j67.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 1000000,
    }),
    secret: 'test123',
    resave: false,
    saveUninitialized: false
}))

initPassport()
initPassportGithub()
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/sessions', sessionRouter)
app.use('/', viewsRouter)

app.use( "*" , (req, res) => {
  res.status(404).send('URL not found');
});

productIO(io)
chatIO(io) 