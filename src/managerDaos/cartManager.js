const fs = require('fs/promises');
const ProductManager = require('./productManager');
const productMan = new ProductManager("./src/data/products.json")

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = []; // initialize the carts array here
  }

  async readCart() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      const carts = JSON.parse(data);
      return carts || []; // return an empty array if the file is empty or if it cannot be parsed as JSON
    } catch (error) {
      console.error(`Error reading cart file: ${error.message}`);
      return []; // return an empty array if file does not exist or cannot be read
    }
  }

  async createCart() {
    try {
      let carts = await this.readCart();
      let cart = this.carts;
      const newId = cart.length + 1;
      const newCart = { id: newId, products: [] };
      carts.push(newCart);
      await this.saveCarts(carts);
      return newCart;
    } catch (error) {
      console.error(`Error creating cart: ${error.message}`);
      return null;
    }
  }


  async addProductToCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    console.log("cart:", cart);
    await productMan.getProductById(productId);

    if (!cart) {
        console.error(`Error adding product to cart: cart with id ${cartId} not found`);
        return null;
    }

    const existingProductIndex = cart.products.findIndex(
        (item) => item.product.id === productId);

    if (existingProductIndex === -1) {
        cart.products.push({ product: { id: productId }, quantity: 1 });
    } else {
        cart.products[existingProductIndex].quantity++;
    }

    await this.updateCart(cart);
    return cart;
}

  async getCartById(id) {
    const carts = await this.getAllCarts();
    const cart = carts.find((cart) => cart.id === id);
    console.log("cart:", cart);
    return cart;
}

  async getAllCarts() {
    try {
      const data = await fs.readFile(this.path);
      const carts = JSON.parse(data);
      return carts;
    } catch (error) {
      console.error(`Error reading cart file: ${error.message}`);
      return []; // return an empty array if file does not exist, is empty, or cannot be parsed as JSON
    }
  }

  async updateCart(cart) {
    const carts = await this.getAllCarts();
    const cartIndex = carts.findIndex((c) => c.id === cart.id);
    carts[cartIndex] = cart;
    await this.saveCarts(carts);
  }

  async saveCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

}


module.exports = CartManager;