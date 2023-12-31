const express = require('express');
const { authors, authorBooks } = require('../controllers/main');
const router = express.Router()
/* /api/authors */
router
    .get('/', authors)
    .get('/:id', authorBooks)
module.exports = router;