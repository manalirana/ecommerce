const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    pinCode: {
        type: Number,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    locality:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('address', addressSchema);