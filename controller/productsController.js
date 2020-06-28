
const { db } = require('./connection')
const { ObjectId } = require('mongodb')

module.exports = {
  async getAllProducts(req, res) {
    (await db()).collection('products').find({}).toArray(function (err, docs) {
      if (err) { console.error(err) }
      res.send(docs)
    })
  },
  async getProductById(req, res) {
    (await db()).collection('products').find({ _id: ObjectId(req.params.id) }).toArray(function (err, docs) {
      if (err) { console.error(err) }
      res.send(docs)
    })
  }
}