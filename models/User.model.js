const mongoose = require('mongoose') // Erase if already required
const bcrypt = require('bcrypt')

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', async function (req, res, next) {
  try {
    // console.log('Called before save:::', this.email, this.password)
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)
    this.password = hashPassword
  } catch (error) {
    next(error)
  }
})
//Export the model
module.exports = mongoose.model('User', userSchema)
