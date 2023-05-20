const socket = io()

socket.on('products', i =>{
    const div = document.querySelector('#products')
    let products = ''
    i.forEach( product => {
        products += `
        <li class="">
            <div>
                <p class="">${product.title}</p>
                <p class="">U$D${product.price}</p>
                <p class="">${product.description}</p>
                <p class="">Quantity: ${product.quantity}</p>
                <p class="">Id: ${product.id}</p>
                <p class="">Code: ${product.code}</p>
                <p class="">Stock: ${product.stock}</p>
                <p class="">Category: ${product.category}</p>
                <p class="">Status: ${product.status}</p>
                <div>
                    <img src="{{product.thumbnails}}" alt="">
                </div>
                <button id="${product._id}" class="removeBtn"> Remove </button>
            </div>
        </li>`
    } )
    div.innerHTML = products

    const removeBtn = document.querySelector('.removeBtn')
    removeBtn.forEach(i => {
        i.addEventListener("click", e => {
            const productId = e.target.id
            socket.emit('deleteProduct', productId)
        })
    })
})


const form = document.querySelector('#form')
form.addEventListener('submit', e => {
    e.preventDefault()

    const submitProducts = {
        title: form.elements.title.value,
        price: form.elements.price.value,
        quantity: form.elements.quantity.value,
        stock: form.elements.stock.value,
        description: form.elements.description.value,
        code: form.elements.code.value,
        category: form.elements.category.value,
        thumbnail: thumbnail
    }

    if(submitProducts.title && submitProducts.description && submitProducts.quantity && submitProducts.code && submitProducts.price && submitProducts.stock && submitProducts.category && submitProducts.thumbnail){
        socket.emit('addProduct', product)
    }
    form.reset()
})