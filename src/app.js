const express = require('express');

const app = express();

const ProductManager = require('./productManager');

// Creamos una instancia de ProductManager con la ruta donde se encuentra el archivo de productos
const manager = new ProductManager('productos.json');

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await manager.getProducts();
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});

// Endpoint para obtener un producto por id
app.get('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await manager.getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: `No se encontró el producto con id ${id}.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
});

// Iniciamos el servidor en el puerto 3000
app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080.');
});