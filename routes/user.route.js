const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const createError = require('http-errors')
const { userValidate } = require('../helpers/validation')

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

    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/logout', (req, res) => {
  res.send('Log out')
})

module.exports = router
