const express = require("express")

const router = express.Router()

const adminController = require("../controllers/admin")

router.post("/add-product", adminController.createProduct)

router.post("/delete-product/:productId", adminController.deleteProduct)

router.post("/update-product/:productId", adminController.updateProduct)

router.post("/orders", adminController.getOrders)

router.post("/add-quantity/:productId", adminController.addQuantity)

module.exports = router
