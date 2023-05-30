const socket = io()
let userEmail = ''

Swal.fire({
    title: 'Tell us your email',
    input: 'email',
    inputPlaceholder: 'Enter your email address',
    inputValidator: (value) => {
        return !value && 'The email is required to chat'
    },
    allowOutsideClick: false,
    onOpen: (modal) => {
        modal.querySelector('input').focus()
    },
    preConfirm: (value) => {
        if (/\S+@\S+\.\S+/.test(value)) {
            return value.trim()
        } else {
            Swal.showValidationMessage('Please enter a valid email address')
            return false
        }
    }
}).then(result => {
    userEmail = result.value
    socket.emit('authenticated', userEmail)
})


const input  = document.getElementById('text')
const log = document.getElementById('messages')

input.addEventListener('keyup',evt=>{
    if(evt.key === "Enter"){
        socket.emit('message', {email: userEmail, message: input.value})
        input.value= ""
    }
})

socket.on('log', data =>{
    let logs=''
    data.logs.forEach(log =>{
        logs += `<li class=""><p class="">${log.email} says: ${log.content}</p></li>`
    })
    log.innerHTML=logs
})