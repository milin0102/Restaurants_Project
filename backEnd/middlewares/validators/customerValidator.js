const zod = require("zod");

const customerSignUpBodySchema = zod.object({
    email:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string(),
    phone:zod.number() .refine(value => String(value).length >= 10, {
        message: 'Number length should be greater`   than or equal to 10 digits',
      })
})

const loginBodySchema = zod.object({
    email:zod.string().email(),
    password:zod.string(),
    role:zod.string()
})


module.exports = {
    customerSignUpBodySchema,
    loginBodySchema
}