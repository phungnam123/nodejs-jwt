const mongoose = require('mongoose')

const conn = mongoose
  .connect(process.env.URI_MONGODB_USERS)
  .then(() => {
    console.log('ConnectDB Sucessfull')
  })
  .catch((err) => {
    console.log(err)
  })

process.on('SIGINT', async () => {
  console.log('Server is disconnected...')
})

module.exports = conn
