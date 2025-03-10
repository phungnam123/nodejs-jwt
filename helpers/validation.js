const Joi = require('joi')

const userValidate = (data) => {
  const userSchema = Joi.object({
    email: Joi.string()
      .email()
      .pattern(new RegExp('gmail.com$'))
      .lowercase()
      .required(),
    password: Joi.string().min(8).max(32).required(),
  })

  return userSchema.validate(data)
}

module.exports = {
  userValidate,
}
