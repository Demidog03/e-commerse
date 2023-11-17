const {Schema, model} = require("../db/connection")

const ProductSchema = new Schema({
  id: {type: Number, required: true},
  title: {type: String},
  price: {type: Number},
  description: {type: String},
  category: {type: String},
  image: {type: String},
  rating: {
    rate: {type: Number},
    count: {type: Number},
  }
})

const Product = model("Product", ProductSchema)

module.exports = Product