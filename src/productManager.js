const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.path = filePath;

    // Leer el archivo y cargar los productos en el arreglo
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.log(`Error al leer el archivo ${this.path}. El archivo será creado al guardar el primer producto.`);
    }
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
    const newProduct = {
      id: this.products.length + 1,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    };
    this.products.push(newProduct);

    // Guardar el arreglo en el archivo
    fs.writeFileSync(this.path, JSON.stringify(this.products));

    console.log(`El producto ${title} se ha agregado correctamente.`);
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log(`No se ha encontrado un producto con id ${id}.`);
    }
    return product;
  }

  getProducts() {
    return this.products;
  }

  updateProduct(id, fieldToUpdate) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log(`No se ha encontrado un producto con id ${id}.`);
      return;
    }

    // Actualizar el producto
    const updatedProduct = {
      ...this.products[index],
      ...fieldToUpdate
    };
    this.products[index] = updatedProduct;

    // Guardar el arreglo en el archivo
    fs.writeFileSync(this.path, JSON.stringify(this.products));

    console.log(`El producto con código ${id} se ha actualizado correctamente.`);
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log(`No se ha encontrado un producto con id ${id}.`);
      return;
    }

    // Eliminar el producto
    this.products.splice(index, 1);

    // Actualizar los IDs de los productos restantes
    for (let i = index; i < this.products.length; i++) {
      this.products[i].id = i + 1;
    }

    // Guardar el arreglo en el archivo
    fs.writeFileSync(this.path, JSON.stringify(this.products));

    console.log(`El producto con id ${id} se ha eliminado correctamente.`);
  }
}

module.exports = ProductManager;
