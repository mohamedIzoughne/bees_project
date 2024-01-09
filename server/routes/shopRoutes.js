const express = require("express")

const router = express.Router()
const productsController = require("../controllers/products")

router.get("/", productsController.getProducts)

router.get("/product-details/:productId", productsController.getProduct)

router.post("/order", productsController.postOrder)

router.get("/categories/:category", productsController.getCategory)

router.get("/mostSelled/:q", productsController.getMostSelled)

module.exports = router
