const { db } = require('./connection')

module.exports = {
  async getSlideShowImages(req, res) {
    (await db()).collection('home-slide').find({}).toArray(function (err, docs) {
      if (err) { console.error(err) }
      res.send(docs)
    })
  }
}