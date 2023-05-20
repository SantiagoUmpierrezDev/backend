const cartModel = require('./models/cart.model.js')

class CartManagerMongo{
    constructor(model){
        this.cartModel = model
    }

    async createCart(){
        try{
            return await cartModel.create({products: []})
        }catch(err){
            return new Error(err)
        }
    }

    async getCarts(){
        try{
            return await cartModel.find({})
        }catch(err){
            return new Error(err)
        }
    }

    async getCartById(cartId){
        try{
            return await cartModel.findOne({_id: cartId}).populate('products.product')
        }catch(err){
            return new Error(err)
        }
    }

    async addProductToCart(cartId, productId){
        const cart = await cartModel.findById(cartId)
        const index = cart.products.findIndex(product => product.product.toString() === productId)
        if (index === -1) { 
            const update = { $push: { products: { product: { _id: productId }, quantity: 1 } } };
            await cartModel.updateOne({ _id: cartId }, update);
        } else { // product found
            const filter = { _id: cartId, 'products.product': productId };
            const update = { $inc: { 'products.$.quantity': 1 } };
            await cartModel.updateOne(filter, update);
        }
    }

    async deleteProductFromCart(cartId, productId){
        const cart = await this.getCartById(cartId)
        const index = cart.products.findIndex(product => product._id === productId)

        if(index === -1){
            return null
        }else{
            const filter = { _id: cartId };
            const update = { $pull: { products: { _id: productId } } }
            await cartModel.updateOne(filter, update)
        }
    }

    async updateCart(cartId, products){
        try{
            const update = { $set: { products: products  } }
            return await cartModel.updateOne({_id: cartId}, update)
        }catch(error){
            return new Error(err)
        }
    }

    async updateQuantity(cartId, productId, quantity){
        const cart = await this.getCartById(cartId)
        const index = cart.products.findIndex(product => product._id === productId)

        if (index === -1 || quantity < 1) {
            return null
        }else {
            const filter = { _id: cartId, 'products._id': productId };
            const update = { $set: { 'products.$.quantity': quantity } };
            await cartModel.updateOne(filter, update);
        }
    }

    async deleteAllProductsFromCart(cid){
        try{
            const update = { $set: { products: [] } }
            await cartModel.updateOne({ _id: cartId }, update)
        }catch(error){
            return new Error(err)
        }
    }
}

module.exports = new CartManagerMongo