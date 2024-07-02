const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const createError = require('http-errors')
const userRoute = require('./routes/user.route')
require('./helpers/connection_mongodb')

app.use(express.json())
app.use(express.urlencoded({ extends: true }))
app.get('/', (req, res, next) => {
  res.send('Home Page')
})

app.use('/users', userRoute)

app.use((req, res, next) => {
  // const error = new Error('Not Found')
  // error.status = 404
  // next(error)
  next(createError.NotFound('The router does not exits'))
})

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  })
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT}`)
})
