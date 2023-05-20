const messageModel = require ('../managerDaos/mongo/models/message.model.js')

const chat = async (io) => {
    let logs = [];

    io.on('connection', socket => {
        socket.on("message", i =>{
            const newMessage = {email: i.email, content: i.message, createdAt: i.madeAt}
            logs.push(newMessage)
            messageModel.create(newMessage)
            io.emit('log', {logs});
        })
    })
}

module.exports = chat