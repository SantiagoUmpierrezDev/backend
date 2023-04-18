const socket = io();
socket.on('products', (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 
    if (products.length > 0) {
      products.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.name}`;
        li.textContent = `${product.description}`;
        li.textContent = `${product.stock}`;
        li.textContent = `${product.category}`;
        li.textContent = `${product.code}`;
        li.textContent = `${product.thumbnail}`;
        productList.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'No products found.';
      productList.appendChild(li);
    }
});