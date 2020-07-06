const { db } = require('./connection')
const updateUserAddress = async (userId, address) => {
  const addressdb = (await db()).collection('user-address')
  const userAddress = await addressdb.findOne({ userId: userId })
  if (userAddress !== null) {
    addressdb.updateOne(
      { userId: userId },
      {
        $set: { userAddress: address },
        function(err) {
          if (err) {
            console.error(err)
          }
        },
      }
    )
  } else {
    addressdb.insertOne({ userId: userId, userAddress: address }, function (
      err
    ) {
      if (err) {
        console.error(err)
      }
    })
  }
}
module.exports = {
  async placeOrder(req, res) {
    try {
      const ordersdb = (await db()).collection('orders')
      ordersdb.insertOne(req.body.order, async function (err) {
        if (err) {
          console.error(err)
          res.status(400).send()
        } else {
          await updateUserAddress(req.body.userId, req.body.address)
          console.log('here')
          res.status(200).send()
        }
      })
    } catch (err) {
      console.error(err)
      res.status(400).send()
    }
  },
  async getUserOrder(req, res) {
    try {
      console.log(req.headers.id)
      const ordersdb = (await db()).collection('orders')
      ordersdb.find({ userId: req.headers.id }).toArray(function (err, docs) {
        if (err) {
          console.error(err)
          res.status(400).send()
        } else {
          res.status(200).send({
            docs,
          })
        }
      })
    } catch (err) {
      console.error(err)
      res.status(400).send()
    }
  },
}
