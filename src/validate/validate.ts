import Joi from "joi"

export const validateRegister = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
})

export const validateLogin = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export const validateSubCategory = Joi.object().keys({
  title: Joi.string().required(),
  category: Joi.string().required(),
})

export const validateSubSubCategory = Joi.object().keys({
  title: Joi.string().required(),
  subCategory: Joi.string().required(),
})
