import express from 'express'
import ProductManager from '../managerDaos/productManager.js';

const viewsRouter = express.Router();

const productMan = new ProductManager("./data/products.json");

viewsRouter.get('/', async(req, res) => {
    await productMan.readFile()
    res.render('home', { products: productMan.getProducts() })
})

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {})
})

export default viewsRouter;