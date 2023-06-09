const express = require('express')
var cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const mainRouter = require('./src/routes')

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: "*",
  method:"*"
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use("/",mainRouter)

app.listen(port, '0.0.0.0', () => {
    console.log(`Connect on port ${port}`)
  })