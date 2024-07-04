const jwt = require('jsonwebtoken')

const signAcessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    const secret = process.env.ACESS_TOKEN_SECRET
    const options = {
      expiresIn: '1h',
    }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

module.exports = {
  signAcessToken,
}
