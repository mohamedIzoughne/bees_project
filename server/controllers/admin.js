const Product = require("../models/product")
const Order = require("../models/order")
const product = require("../models/product")

exports.createProduct = async (req, res, next) => {
  const { title, description, price, weight, type } = req.body

  let imageUrl = ""

  if (req.file) {
    imageUrl = req.file.path
  }

  try {
    const product = new Product({
      title,
      description,
      price,
      weight,
      imageUrl,
      type,
    })

    await product.save()
    await res.json({ message: "product is Added", product })
  } catch (error) {
    next(error)
  }
}

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId

  try {
    const product = await Product.findById(productId)
    if (!product) {
      const error = new Error("Could not find product")
      error.statusCode = 404
      throw error
    }
    await Product.deleteOne({ _id: productId })
    await res.json({ message: "product is deleted" })
  } catch (error) {
    next(error)
  }
}

exports.updateProduct = async (req, res, next) => {
  const productId = req.params.productId
  const { title, description, price, weight, type } = req.body
  let imageUrl

  if (req.file) {
    imageUrl = req.file.path
  }

  try {
    let product = await Product.findById(productId)
    if (!product) {
      const error = new Error("Could not find product")
      error.statusCode = 404
      throw error
    }

    product.title = title
    product.description = description
    product.price = price
    product.weight = weight
    product.imageUrl = imageUrl
    product.type = type

    await product.save()
    await res.status(301).json({ message: "Product updated", product })
  } catch (error) {
    next(error)
  }
}

exports.getOrders = async (req, res, next) => {
  Order.find()
    .then((orders) => {
      res.json({
        message: "got products",
        orders: orders.reverse(),
      })
    })
    .catch((err) => {
      next(err)
    })
}

exports.addQuantity = async (req, res, next) => {
  const { productId } = req.params
  const { quantity } = req.body
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        const error = new Error("This product does'nt exist")
        error.statusCode = 404
        throw error
      }

      product.quantity += quantity
      product.save()
    })
    .catch((err) => next(err))
}
