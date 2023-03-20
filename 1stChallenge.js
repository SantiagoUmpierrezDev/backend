class ProductManager {
    constructor() {
      this.products = [];
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
        // Verificar si todos los campos están completos
         if (!title || !description || !price || !thumbnail || !code || !stock) {
          console.log('Todos los campos son requeridos para agregar un producto.');
        } 
        // Verificar si el código identificador ya existe
        const existingProduct = this.products.some((product) => product.code == code)
        if (existingProduct) {
          console.log(`No se pudo agregar el producto con código ${code} porque ya existe.`);
            } else {
            // Agregar el producto al arreglo products
            this.products.push ({
                id: this.products.length + 1,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail, 
                code: code,
                stock: stock
            })
                console.log(`El producto ${title} se ha agregado correctamente.`);
            }
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        console.log(`No se ha encontrado un producto con código ${id}.`);
      }
      return product;
    }
  
    getProducts() {
        return this.products;
    }

}




