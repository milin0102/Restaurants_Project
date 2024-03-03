const zod = require("zod");

const registerRestaurantSchema = zod.object({
    email:zod.string().email(),
    name:zod.string(),
    phone:zod.number().refine(value => String(value).length >= 10, {
        message: 'Number length should be greater`   than or equal to 10 digits',
      }),
    address:zod.object({
        City:zod.string(),
        Zipcode:zod.number(),
        AddressLine1:zod.string()
    }),
    country:zod.string(),
    dishes:zod.array()
}).nonstrict()



module.exports = {
    registerRestaurantSchema
}