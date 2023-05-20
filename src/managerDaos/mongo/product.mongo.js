const productModel = require('./models/product.model.js')

class ProductManagerMongo {
    constructor(model){
        this.productModel = model
    }

    async getProducts(query, options){
        try{
            return await productModel.paginate(query, options)
        }catch(err){
            return new Error(err)
        }
    }

    async getProductById(productId){
        try{
            return await productModel.findOne({_id: productId})
        }catch(err){
            return new Error(err)
        }
    }

    async addProduct(product){
        try{
            return await productModel.create(product)
        }catch(err){
            return new Error(err)
        }
    }

    async updateProduct(productId, product){
        try{
            return await productModel.updateOne({_id: productId}, product)
        }catch(err){
            return new Error(err)
        }
    }

    async deleteProduct(productId){
        try{
            return await productModel.deleteOne({_id: productId})
        }catch(err){
            return new Error(err)
        }
    }
}

module.exports = new ProductManagerMongo;