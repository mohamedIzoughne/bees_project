const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: String,
    // default: ""
  },
  buyTimes: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
})

productSchema.methods.incrementBuyTimes = function (times) {
  this.buyTimes += times
  this.quantity -= times
  return this.save()
}

productSchema.methods.incrementQuantity = function (times) {
  this.quantity -= times

  return this.save()
}

module.exports = mongoose.model("Product", productSchema)
