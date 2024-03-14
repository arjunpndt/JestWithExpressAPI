const Joi = require("joi");
const { signup } = require("../controllers/user.controller");



module.exports = {
    login : Joi.object({
        username: Joi.string().required(), 
        password: Joi.string().required(),
    }),
    signup : Joi.object({
        username: Joi.string().min(5).required(), 
        password: Joi.string().min(5).required(),
    })
}