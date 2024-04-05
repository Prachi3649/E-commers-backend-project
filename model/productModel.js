const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : String,
    price: String,
    userId: String,
    category: String,
    company: String
})

module.exports = mongoose.model ("products" ,productSchema);