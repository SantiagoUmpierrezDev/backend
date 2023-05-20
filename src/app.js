const express = require ('express')
const handlebars = require ('express-handlebars') 
const productsRouter = require ('./routes/products.router.js') 
const cartRouter = require ('./routes/cart.router.js') 
const viewsRouter = require ('./routes/views.router.js') 
const productIO = require ('./utils/products_io.js') 
const chatIO = require ('./utils/chat_io.js') 
const objectConfig = require ('./config/objectConfig.js') 
const { Server } = require ('socket.io') 

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
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)

app.use( "*" , (req, res) => {
  res.status(404).send('URL not found');
});

productIO(io)
chatIO(io)