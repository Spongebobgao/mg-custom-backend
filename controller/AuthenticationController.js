const { db } = require('./connection')

module.exports = {
  async authenticate(req, res) {
    const usersdb = (await db()).collection('users')
    if (req.body.newUser) {
      if ((await usersdb.findOne({ email: req.body.email })) === null) {
        delete req.body.newUser
        usersdb.insertOne(req.body, function (err) {
          if (err) {
            console.error(err)
          }
          res.send(true)
        })
      } else {
        res.send(false)
      }
    } else {
      const user = await usersdb.findOne({
        email: req.body.email,
        password: req.body.password,
      })
      res.send(user)
    }
  },
  async getUserAddress(req, res) {
    try {
      const addressdb = (await db()).collection('user-address')
      console.log(req.headers)
      const userAddress = await addressdb.findOne({
        userId: req.headers.userid,
      })
      console.log(userAddress)
      res.status(200).send(userAddress)
    } catch (err) {
      console.error(err)
      res.status(400).send()
    }
  },
}
