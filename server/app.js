const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const shopRoutes = require("./routes/shopRoutes")
const adminRoutes = require("./routes/adminRoutes")
const multer = require("multer")
const isAdmin = require("./middleware/is-admin")

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    )
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(bodyParser.json())
app.use("/images", express.static(path.join(__dirname, "images")))
app.use(multer({ storage: fileStorage, fileFilter }).single("image"))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE",
    "OPTIONS"
  )
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})

app.use("/products", shopRoutes)
app.use("/admin", isAdmin, adminRoutes)
// Handle Errors:
app.use((error, req, res, next) => {
  const message = error.message
  let status = error.statusCode
  if (!status) {
    status = 500
  }
  res.status(status).json({ message })
})

mongoose.connect("mongodb://127.0.0.1:27017/honey").then(() => {
  app.listen(process.env.PORT || 3000)
})
