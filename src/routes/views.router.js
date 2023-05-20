const express = require ('express')
const productManager = require('../managerDaos/mongo/product.mongo.js')
const cartManager =  require('../managerDaos/mongo/cart.mongo.js') 
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home', {}); 
  });

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {})
})

router.get('/chat', (req,res) => {
    res.render('chat', {})
})

router.get('/products', async (req, res) => {
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
        } else if (req.query.sort === "down") {
            sort = { price: -1 };
        }
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

router.get('/cart/:cid', async(req,res) => {
    res.render('cart', {status: 'succes', payload: await cartManager.getCartById(req.params.cid)})
})

module.exports = router;