const express = require ('express')
const productManager = require('../managerDaos/mongo/product.mongo.js')
const productsRouter = express.Router()

productsRouter.get('/', async (req, res) => {
    try{
        let query = {}
        if(req.query.query === undefined){ 
            query = {}
        }else if(req.query.query === 'true'){ 
            query.status = true
        }else if(req.query.query === 'false'){ 
            query.status = false
        }else{ 
            query.category = req.query.query
        }

        let sort = null
        if (req.query.sort === "up") { 
            sort = { price: 1 };
        } else if (req.query.sort === "desc") {
            sort = { price: -1 };
        }
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

productsRouter.get('/:pid', async (req, res) => {
    try{
        const product = await productManager.getProductById(req.params.pid)
        res.status(200).send({status: 'succes', payload: product})
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

productsRouter.post('/', async (req, res) => {
    try{
        const product = req.body
        await productManager.addProduct(product)
        res.status(200).send({status: 'succes', payload: await productManager.getProducts()})
    }catch (err){
        res.status(500).json({ error: err.message });
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try{
        const product = req.body
        await productManager.updateProduct(req.params.pid, product)
        res.status(200).send({status: 'succes', payload: await productManager.getProducts()})
    }catch (err){
        res.status(500).json({ error: err.message });
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try{
        await productManager.deleteProduct(req.params.pid)
        res.status(200).send({status: 'succes', payload: await productManager.getProducts()})
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

module.exports = productsRouter;