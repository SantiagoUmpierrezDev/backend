const productMan = require ('../managerDaos/mongo/product.mongo.js')

const product = async (io) => {
    const products = await productMan.getProducts()

    io.on('connection', i => {
        console.log("New client connected");
        i.emit('products', products)
        i.on('addProduct', async data => {
            await productMan.addProduct(data)
            const products = await productMan.getProducts()
            socket.emit('products', products)
        })
        i.on('deleteProduct', async data => {
            await productMan.deleteProduct(data)
            const products = await productMan.getProducts()
            socket.emit('products', products)
        })
    })
}

module.exports = product;