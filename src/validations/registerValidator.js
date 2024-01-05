const { check, body } = require("express-validator");
const db = require('../database/models')

module.exports = [
    check("name")
        .notEmpty().withMessage("El nombre es obligatorio"),
    body("email")
        .notEmpty().withMessage("El email es obligatorio").bail()
        .isEmail().withMessage("El email tiene un forma incorrecto")
        .custom((value, { req }) => {
            return db.User.findOne({
                where: {
                    email: value
                }
            }).then(user => {
                if (user) {
                    return Promise.reject()
                }
            }).catch(error => {
                console.log(error)
                return Promise.reject('El email ya se encuentra registrado')
            })
        }),
        
    check("country")
        .notEmpty().withMessage("El pais es obligatorio"),
    check("password")
        .notEmpty().withMessage("El password es obligatorio").bail()
        .isLength({
            min: 6,
            max: 12
        }).withMessage('El password debe tener entre 6 y 12 caracteres'),

    check("category")
        .notEmpty().withMessage("La categoria es obligatorio")

];