const { db } = require('./connection')

module.exports = {
  async placeOrder(req, res) {
    const ordersdb = (await db()).collection('orders')
    ordersdb.insertOne(req.body, function (err) {
      if (err) {
        console.error(err)
      }
      res.send(true)
    })
  },
}
