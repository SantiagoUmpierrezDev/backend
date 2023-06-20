const mongoose=  require('mongoose');

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique :true
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true
  }
});

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;