const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: Number,
    required: true,
  },
  items: {
    type: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
})

module.exports = mongoose.model("Order", orderSchema)
