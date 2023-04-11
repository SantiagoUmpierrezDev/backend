const express = require('express');

const app = express();
const port = 8080;

const productRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use( "*" , (req, res) => {
  res.status(404).send('Ruta no encontrada');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


