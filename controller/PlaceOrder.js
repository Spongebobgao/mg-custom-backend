const { db } = require('./connection')

module.exports = {
  async placeOrder(req, res) {
    try {
      const ordersdb = (await db()).collection('orders')
      ordersdb.insertOne(req.body, function (err) {
        if (err) {
          console.error(err)
          res.status(400).send()
        } else {
          res.status(200).send()
        }
      })
    } catch (err) {
      res.status(400).send()
    }
  },
  async updateUserAddress(req, res) {
    const addressdb = (await db()).collection('user-address')
    const address = addressdb.findOne({ userId: req.body.userId })
    // if (address !== null) {
    //   addressdb.update()
    // }
  },
}
