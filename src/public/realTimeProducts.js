const socket = io()

// Get products and show them
socket.on('products', data =>{
    const div = document.getElementById("products");
    let products = ''
    data.forEach( product => {
        products += `
        <li class="">
            <div>
                <p class="">${product.title}</p>
                <p class="">U$D${product.price}</p>
                <p class="">${product.description}</p>
                <p class="">Id: ${product.id}</p>
                <p class="">Code: ${product.code}</p>
                <p class="">Status: ${product.status}</p>
                <p class="">Stock: ${product.stock}</p>
                <p class="">Category: ${product.category}</p>
                <p class=""> ${product.thumbnail}</p>
                <button class="deleteButton" id="${product._id}" class="">DELETE</button>
            </div>
        </li>`
    } )
    div.innerHTML = products

const deleteButtons = document.querySelectorAll('.deleteButton')
    deleteButtons.forEach(button => {
        button.addEventListener("click", e => {
            const productId = e.target.id
            socket.emit('deleteProduct', productId)
        })
    })
})

const form = document.querySelector('#form')
form.addEventListener('submit', e => {
    e.preventDefault()

    const product = {
        title: form.elements.title.value,
        description: form.elements.description.value,
        code: form.elements.code.value,
        price: form.elements.price.value,
        stock: form.elements.stock.value,
        category: form.elements.category.value,
        thumbnails: form.elements.thumbnail.value
    }

    if(product.title && product.description && product.code && product.price && product.stock && product.category && product.thumbnail){
        socket.emit('addProduct', product)
    }

    form.reset()
})