module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization")

  if (!authHeader) {
    const error = new Error("not authenticated")
    error.statusCode = 401
    throw error
  }
  // to get a header value
  const token = authHeader.split(" ")[1]

  if (token !== "tBNYW1PDEfpBFTwg83lpyTY") {
    err.statusCode = 500
    throw err
  }
  next()
}
