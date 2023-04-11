const express = require('express');
const router = express.Router();
const CartManager = require('../managerDaos/cartManager.js');
const cartMan = new CartManager("./src/data/cart.json");

router.post('/', async (req, res) => {
  try {
    const cart = await cartMan.createCart();
    res.status(201).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartMan.addProductToCart(cid, pid);
    res.status(201).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartMan.getCartById(cid);
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;