import fs from 'fs/promises';

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.path = filePath;
  }
    
  async readFile() {
    try {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(data)            
    } catch (error) {
      console.log(`Error reading product file: ${error.message}`);
    }
    
  }

  
  async addProduct(title, description, price, thumbnail, code, stock, category) {
    // Verificar si todos los campos están completos
    if (!title || !description || !price || !category || !code || !stock ) {
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
    const status = true;
    const newProduct = {
      id: this.products.length + 1,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      category: category, 
      status, 
    };
    this.products.push(newProduct);

    // Guardar el arreglo en el archivo
    fs.writeFileSync(this.path, JSON.stringify(this.products));

    console.log(`El producto ${title} se ha agregado correctamente.`);
  }

  getProductById(id) {
    const products = this.products;
    const product = products.find((product) => product.id === id);
    return product;
  }

  getProducts() {
    return this.products;
    }

  async updateProduct(id, fieldToUpdate) {
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

  async deleteProduct(id) {
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

export default ProductManager;