import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './utils/utils.js'
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import productsIO from './utils/products_io.js'
import { Server } from 'socket.io';

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => { console.log(`Server running on port ${port}`);});
const io = new Server(httpServer);

/* app.use( "*" , (req, res) => {
  res.status(404).send('Ruta no encontrada');
}); */

app.engine ('handlebars', handlebars.engine());
app.set ('views', __dirname+'/views');
app.set ('view engine', 'handlebars')
app.use ('/static', express.static(__dirname+'/public'))
app.use ('/', viewsRouter);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.use('/products', productsIO);

io.on('connection', socket => {
  console.log("New client found");
  socket.on('products', products =>{
  })
})



