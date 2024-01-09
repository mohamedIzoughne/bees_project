const Product = require("../models/product")
const Order = require("../models/order")
const product = require("../models/product")

exports.getProducts = async (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json({
        message: "got products",
        products: products.reverse(),
      })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getProduct = async (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find product")
        error.statusCode = 404
        throw error
      }

      res.json({
        message: "got product",
        product: product,
      })
    })
    .catch((err) => {
      next(err)
    })
}

exports.postOrder = async (req, res, next) => {
  const { phoneNumber, email, items } = req.body
  try {
    const order = new Order({
      phoneNumber,
      email,
      items,
    })

    await order.save().then(() => {
      const ids = []
      items.forEach((item) => {
        ids.push(item.productId)
      })
      const quantities = []
      items.forEach((item) => {
        quantities.push(item.quantity)
      })

      Product.find({ _id: { $in: ids } }).then((products) => {
        for (let i = 0; i < products.length; i++) {
          product.incrementBuyTimes(quantities[i])
        }
      })
    })
    await res.json({ message: "order is sent", order })
  } catch (error) {
    next(error)
  }
}

exports.getMostSelled = async (req, res, next) => {
  const { q } = req.params
  Product.find()
    .then((products) => {
      if (products.length < q) return products

      const best = []

      for (let i = 0; i < q; i++) {
        let iMax = 0

        for (let j = 0; j < products.length; j++) {
          if (
            products[iMax].buyingTimes <= products[i].buyingTimes &&
            !best.includes(i)
          ) {
            iMax = i
          }
        }
        best.push(iMax)

        for (let i = 0; i < q; i++) {
          best[i] = products[best[i]]
        }
        return best
      }
    })
    .then((prods) => {
      res.json({ message: "Most buyed", products: prods })
    })
}

exports.getCategory = async (req, res, next) => {
  const { category } = req.params

  Product.find({ category }).then((products) => {
    res.json({ products })
  })
}
