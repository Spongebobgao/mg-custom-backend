const { db } = require('./connection')

module.exports = {
  async authenticate(req, res) {
    const usersdb = (await db()).collection('users')
    if (req.body.newUser) {
      if ((await usersdb.findOne({ 'email': req.body.email })) === null) {
        delete req.body.newUser
        usersdb.insertOne(req.body, function (err) {
          if (err) { console.error(err) }
          res.send(true)
        })
      } else {
        res.send(false)
      }
    } else {
      const user = await usersdb.findOne({ 'email': req.body.email, 'password': req.body.password })
      if ((user === null)) {
        res.send(null)
      } else {
        res.send(user)
      }
    }
  },
  async insertOrder(req, res) {
    const usersdb = (await db()).collection('users')
    // const user = await usersdb.findOne({ 'email': req.body.userEmail })
    delete req.body.userEmail
    console.log(req.body)
    usersdb.updateOne({ "email": req.body.userEmail }, { $push: { "orders": req.body } }, function (err) {
      if (err) { console.error(err) }
      res.send(true)
    })
  }
}