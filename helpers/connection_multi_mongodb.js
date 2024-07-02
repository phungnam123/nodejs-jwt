const mongoose = require('mongoose')

const newConnection = async (uri) => {
  const conn = mongoose.createConnection(uri)
  conn.on('connected', function () {
    console.log(`Mongodb:::connected:::${this.name}`)
  })

  conn.on('error', function (error) {
    console.log(`MongoDb:::error::: ${JSON.stringify(error)}`)
  })

  process.on('SIGINT', async () => {
    console.log('Server is disconnected...')
  })
}

const testConnection = newConnection(process.env.URI_MONGODB_TEST)
const userConnection = newConnection(process.env.URI_MONGODB_USERS)

module.exports = { testConnection, userConnection }
