const products = require('./controller/productsController')
const homeSlide = require('./controller/homeSlideController')
const authentication = require('./controller/AuthenticationController')
const orders = require('./controller/PlaceOrder')

module.exports = (app) => {
  app.get('/', homeSlide.getSlideShowImages)
  app.get('/products', products.getAllProducts)
  app.get('/products/:id', products.getProductById)
  app.post('/checkout/sign-in', authentication.authenticate)
  app.post('/checkout/fullfillment', orders.placeOrder)
  app.get('/checkout/fullfillment', authentication.getUserAddress)
  app.get('/checkout/sign-in', orders.getUserOrder)
}
