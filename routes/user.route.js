const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const createError = require('http-errors')

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw createError.BadRequest()
    }

    const isExistsEmail = await User.findOne({ email })
    if (isExistsEmail) {
      throw createError.Conflict(`${email} is already registered`)
    }

    const isCreate = await User.create({
      email,
      password,
    })

    res.json({
      status: 'OK',
      data: isCreate,
    })
  } catch (error) {
    next(error)
  }
})

router.post('/refresh-token', (req, res) => {
  res.send('Function Refresh Token')
})

router.post('/login', (req, res) => {
  res.send('Log in')
})

router.post('/logout', (req, res) => {
  res.send('Log out')
})

module.exports = router
