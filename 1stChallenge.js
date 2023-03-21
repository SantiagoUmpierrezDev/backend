class ProductManager {
    constructor() {
      this.products = [];
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Verificar si todos los campos están completos
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Todos los campos son requeridos para agregar un producto.');
        return;
      }
  
      // Verificar si el código identificador ya existe
      const existingProduct = this.products.some((product) => product.code === code);
      if (existingProduct) {
        console.log(`No se pudo agregar el producto con código ${code} porque ya existe.`);
        return;
      }
  
      // Agregar el producto al arreglo products
      this.products.push({
        id: this.products.length + 1,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      });
      console.log(`El producto ${title} se ha agregado correctamente.`);
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

const productManager = new ProductManager();
productManager.addProduct("Samsung's latest phone", 1300, "img", "003", 11);
productManager.addProduct("Samsung Galaxy S23 ultra", "Samsung's latest phone", 1300, "img", "001", 11);
productManager.addProduct("iPhone 13", "Apple's phone", 999.99, "img", "001", 10);
productManager.addProduct("iPhone 14", "Apple's latest iPhone", 1400, "img", "002", 11);
console.log(productManager.getProducts());
console.log(productManager.getProductById(2))




