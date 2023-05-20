const mongoose = require ('mongoose')

let URL = "mongodb+srv://dbSantiago:dbSantiago@cluster0.dtnfkxj.mongodb.net/?retryWrites=true&w=majority"

module.exports = {
    connectDB: () => {
        mongoose.connect(URL)
        console.log("Connected to the DB");
    }
}

