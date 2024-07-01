const express = require('express')
const router = express.Router()

router.post('/register', (req, res) => {
  res.send('Function Register')
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
