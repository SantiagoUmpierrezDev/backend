const socket = io()

const input  = document.getElementById('text')
const log = document.getElementById('messages')
const date = new Date()

socket.on('log', data =>{
    let logs=''
    data.logs.forEach(i =>{
        logs += `<li class="">${i.email}: ${i.content}</p> ${i.madeAt}</li>`
    })
    i.innerHTML=logs
})