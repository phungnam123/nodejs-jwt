const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const signAcessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    const secret = process.env.ACESS_TOKEN_SECRET
    const options = {
      expiresIn: '10s',
    }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

const verifyAccessToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized())
  }

  const authHeader = req.headers.authorization
  const bearerToken = authHeader.split(' ')
  const token = bearerToken[1]
  // Start verify token
  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return next(createError.Unauthorized())
    }
    req.payload = payload
    next()
  })
}

const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    const secret = process.env.REFRESH_TOKEN_SECRET
    const options = {
      expiresIn: '1y',
    }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

module.exports = {
  signAcessToken,
  verifyAccessToken,
  signRefreshToken,
}
