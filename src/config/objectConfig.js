const mongoose = require('mongoose');

let URL = "mongodb+srv://santiagoump:backendProject@backendproject.wyi0j67.mongodb.net/backendProject?retryWrites=true&w=majority"

module.exports = {
    connectDB: () => {
        mongoose.connect(URL)
        console.log("Connected to the DB");
    }
}

