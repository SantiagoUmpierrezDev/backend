const express = require ('express')
const cartManager = require ('../managerDaos/mongo/cart.mongo.js'); 
const cartRouter = express.Router()

cartRouter.get('/:cid', async (req, res) => {
    try{
        res.status(200).send({status: 'succes', payload: await cartManager.getCartById(req.params.cid)})
    }catch(err){  
        res.status(500).json({ error: err.message });
    }
})

cartRouter.post('/', async (req, res) => {
    try{
        await cartManager.createCart()
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    try{
        await cartManager.addProductToCart(req.params.cid, req.params.pid)
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch (err){
        res.status(500).json({ error: err.message });
    }
})

cartRouter.put('/:cid', async (req, res) => {
    try{
        const products = req.body
        await cartManager.updateCart(req.params.cid, products)
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    try{
        const quantity = req.body.quantity
        await cartManager.updateQuantity(req.params.cid, req.params.pid, quantity)
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

cartRouter.delete('/:cid/products/:pid', async (req,res) => {
    try{
        await cartManager.deleteProductFromCart(req.params.cid, req.params.pid)
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

cartRouter.delete('/:cid', async (req,res) => {
    try{
        await cartManager.deleteAllProductsFromCart(req.params.cid)
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

module.exports = cartRouter;