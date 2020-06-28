require('dotenv').config()
const { MongoClient } = require('mongodb');

var db = async () =>
  (await MongoClient.connect(process.env.MONGODB_URI || process.env.DB_HOST, { useUnifiedTopology: true })).db(process.env.DB_DATABASE)


module.exports = { db }