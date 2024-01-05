const { check, body } = require("express-validator");
const db = require('../database/models');
const { compareSync } = require("bcryptjs");

module.exports = [
    check("email")
        .notEmpty().withMessage("El email es obligatorio").bail()
        .isEmail().withMessage("El email tiene un forma incorrecto").bail(),
    body("password")
        .notEmpty().withMessage("El password es obligatorio").bail()
        .custom((value, { req }) => {
            return db.User.findOne({
                where: {
                    Email: req.body.email
                }
            }).then(user => {
                if (!user || !compareSync(value, user.Pass)) {
                    return Promise.reject()
                }
            }).catch(error => {
                console.log(error)
                return Promise.reject('Las credenciales son inválidas')
            })
        })
];
