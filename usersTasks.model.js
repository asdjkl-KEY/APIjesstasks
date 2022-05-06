const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    tasks: Array
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;