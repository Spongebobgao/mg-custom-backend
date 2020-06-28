require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')//logging
const history = require('connect-history-api-fallback');

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(history());

require('./routes')(app)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server starts on ${port}`)
});
