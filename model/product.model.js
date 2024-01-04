const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    picture: String,
    description: String,
    gender: String,
    category: String,
    price: Number,
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
},
    { versionKey: false }
)
const ProductModel = mongoose.model("product", productSchema)
module.exports = { ProductModel }