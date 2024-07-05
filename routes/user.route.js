const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const createError = require('http-errors')
const { userValidate } = require('../helpers/validation')
const {
  signAcessToken,
  verifyAccessToken,
  signRefreshToken,
} = require('../helpers/jwt_service')

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { error } = userValidate(req.body)
    if (error) {
      throw createError(error.details[0].message)
    }

    // if (!email || !password) {
    //   throw createError.BadRequest()
    // }

    const isExistsEmail = await User.findOne({ email })
    if (isExistsEmail) {
      throw createError.Conflict(`${email} is already registered`)
    }

    const user = new User({ email, password })
    const saveduser = await user.save()

    res.status(201).json({
      status: 'OK',
      data: saveduser,
    })
  } catch (error) {
    next(error)
  }
})

router.post('/refresh-token', (req, res) => {
  res.send('Function Refresh Token')
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { error } = userValidate(req.body)
    if (error) {
      throw createError(error.details[0].message)
    }

    const user = await User.findOne({ email })
    if (!User) {
      throw createError.NotFound('Email is not registered')
    }

    const isValid = await user.isCheckPassword(password)
    if (!isValid) {
      throw createError.Unauthorized()
    }

    const accessToken = await signAcessToken(user._id)
    const refreshToken = await signRefreshToken(user._id)
    res.json({ accessToken, refreshToken })
  } catch (error) {
    next(error)
  }
})

router.post('/logout', (req, res) => {
  res.send('Log out')
})

router.get('/getList', verifyAccessToken, (req, res, next) => {
  // console.log(req.headers.authorization)

  const listUsers = [
    {
      email: 'abc@gmail.com',
    },
    {
      email: 'abc@gmail.com',
    },
  ]
  res.send({ listUsers })
})

module.exports = router
