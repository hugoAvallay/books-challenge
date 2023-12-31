const express = require('express');
const { home, bookDetail } = require('../controllers/main');
const router = express.Router()
/* /api/books */
router
    .get('/',home)
    .get('/:id',bookDetail)
module.exports = router;