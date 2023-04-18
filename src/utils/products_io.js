import express from 'express'
import ProductManager from "../managerDaos/productManager.js"

const productMan = new ProductManager("../data/products.json");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await productMan.readFile();
    io.emit('products', products); 
    res.render('products', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

export default router;