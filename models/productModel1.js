const mongoose = require('mongoose')

const productSchama = new mongoose.Schema({
product_id:{
    type: String,
    unique: true,
    trim: true,
    required: true
},title:{
    type: String,
    trim: true,
    required: true
},
price:{
    type: Number,
    trim: true,
    required: true
},
description:{
    type: String,
    required: true
},
content:{
    type: String,
    required: true
},
images:{
    type: Object,
    required: true
},
category:{
    type: String,
    required: true
},
checked:{
    type: Boolean,
    default: false
},

sold:{
    type: Number,
    default: 0
}

},{
    timestamps: true
})

module.exports = mongoose.model("Products", productSchama)