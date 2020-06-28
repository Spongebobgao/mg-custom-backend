
const products = require('./controller/productsController')
const homeSlide = require('./controller/homeSlideController')
const authentication = require('./controller/AuthenticationController')

module.exports = (app) => {
  app.get('/', homeSlide.getSlideShowImages)
  app.get('/products', products.getAllProducts)
  app.get('/products/:id', products.getProductById)
  app.post('/checkout/sign-in', authentication.authenticate)
  app.put('/checkout/fullfillment', authentication.insertOrder)
}