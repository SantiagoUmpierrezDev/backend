const fs = require('fs').promises

class ProductManager {
    constructor(filePath){
        this.filePath = filePath
        this.products = []
    }

    async loadProducts() {
        try {
            if(fs.stat(this.filePath)){
                const fileData = await fs.readFile(this.filePath, 'utf-8');
                this.products = JSON.parse(fileData)
            }
        } catch (err) {
            fs.writeFile(this.filePath, JSON.stringify(this.products), 'utf-8')
        }
    }
    
    async saveProducts() {
        try {
            const jsonData = JSON.stringify(this.products)
            await fs.writeFile(this.filePath, jsonData)
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async addProduct(product){
        const exists = this.products.some((productSaved) => productSaved.code == product.code)
        
        if(exists)
            throw new Error("The product already exists")
        
        if(exists == false && product.title && product.description && product.code && product.price && product.stock && product.category && product.thumbnail){
            this.products.push({
                id: this.products.length + 1,
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status === false ? false : true,
                stock: product.stock,
                category: product.category,
                thumbnail: product.thumbnail
            })
            
            await this.saveProducts()
        }else{
            throw new Error("All the fields are required")
        }
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const productById = this.products.find((product) => product.id == id)
        if(productById){ return productById }
        else{ throw new Error("A product with the id:" + id + "does not exist") }
    }

    async updateProduct(id, updatedProduct){
        const productToUpdate = this.products.find( product => product.id == id )
        if(productToUpdate){
            const isRepeated = this.products.some((productSaved) => productSaved.code == updatedProduct.code) 
            if(isRepeated == false){
                this.products[id - 1] = { 
                    ...this.products[id - 1], 
                    ...updatedProduct 
                }

                await this.saveProducts()
            }else{
                throw new Error("A product with the code" + updatedProduct.code + "already exists")
            }
        }else{
            throw new Error("A product with the id:" + id + "does not exist")
        }
    }

    async deleteProduct(id){
        const productToDelete = this.products.find( product => product.id == id )
        if(productToDelete){
            this.products = this.products.filter( product => product.id !== id )

            await this.saveProducts()
        }else{
            throw new Error("A product with the id:" + id + "does not exist")
        }
    }
}

module.exports = ProductManager;