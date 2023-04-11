const express = require('express');
const ProductManager = require('../managerDaos/productManager');
const productsRouter = express.Router();
const productMan = new ProductManager("./src/data/products.json")

productsRouter.get('/', async (req, res) => {
  try {
    await productMan.readFile();
    const limit = req.query.limit || null;
    const products = productMan.getProducts(limit);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

productsRouter.get('/:pid', async (req, res) => {
  try {
    await productMan.readFile();
    const product = await productMan.getProductById(req.params.pid);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: `Product with id ${req.params.pid} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

productsRouter.post('/', async (req, res) => {
  try {
    await productMan.readFile();
    const product = await productMan.addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

productsRouter.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await productMan.updateProduct(req.params.pid, req.body);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: `Product with id ${req.params.pid} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

productsRouter.delete('/:pid', async (req, res) => {
  try {
    await productMan.readFile();
    const deletedProduct = await productMan.deleteProduct(req.params.pid);
    if (deletedProduct) {
      res.status(200).json({ message: `Product with id ${req.params.pid} deleted` });
    } else {
      res.status(404).json({ error: `Product with id ${req.params.pid} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = productsRouter;