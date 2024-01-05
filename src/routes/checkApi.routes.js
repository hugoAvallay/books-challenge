const express = require('express')
const { checkEmail } = require('../controllers/apiController')
const router = express.Router()

/* /api */
router.get('/check-email', checkEmail)

module.exports = router