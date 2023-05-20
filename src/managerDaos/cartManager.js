const { log } = require('console');

const fs = require('fs').promises

class CartManager{
    constructor(filePath){
        this.filePath = filePath;
        this.carts = []
    }

    async loadCarts(){
        try{
            if(fs.stat(this.filePath)){
                const fileData = await fs.readFile(this.filePath, 'utf-8');
                this.carts = JSON.parse(fileData)
            }
        }catch (error){
            fs.writeFile(this.filePath, JSON.stringify(this.carts), 'utf-8')
        }
    }

    async saveCarts(){
        try{
            const jsonData = JSON.stringify(this.carts)
            await fs.writeFile(this.filePath, jsonData)
        }catch (error){
            throw new Error(error.message)
        }
    }

    async createCart(){
        await this.loadCarts()
        this.carts.push({
            id: this.carts.length + 1,
            products: []
        })

        await this.saveCarts()
    }

    async getCarts(){
        await this.loadCarts()
        return this.carts
    }

    async getCartById(id){
        await this.loadCarts()
        const cart = this.carts.find((cart) => cart.id == id)
        if(cart){ return cart }
        else{ throw new Error("A product with the id:" + id + "does not exist") }
    }

    async productExists(id){
        const fileData = await fs.readFile("./src/data/products.json", 'utf-8');
        const products = JSON.parse(fileData)
        const productById = products.find((product) => product.id == id)

        if(!productById) throw new Error("A product with the id:" + id + "does not exist") 
    }

    async addProductToCart(cartId, productId){ 
        await this.productExists(productId)

        await this.loadCarts()
        const cart = await this.getCartById(cartId)
        const index = cart.products.findIndex(product => product.id == productId)

        if(index === -1){
            cart.products.push({
                id: productId,
                quantity: 1
            })
            this.saveCarts()
        }else{
            cart.products[index] = ({
                ...cart.products[index], 
                quantity: Number(cart.products[index].quantity) + 1 
            })
            this.saveCarts()
        }
    }
}

module.exports = CartManager