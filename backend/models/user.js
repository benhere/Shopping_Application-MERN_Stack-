const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true,
        trim:true
    },
    passwordHash:{
        type: String,
        required:true
    },
    // to cart items, we will create cart array
    // and within this cart we will store product id
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]
})

module.exports = mongoose.model("User",userSchema);
