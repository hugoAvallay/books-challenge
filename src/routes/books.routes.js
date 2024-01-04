const express = require('express');
const { home, bookDetail, edit, processEdit, deleteBook } = require('../controllers/main');
const router = express.Router()
/* /api/books */
router
    .get('/',home)
    .get('/:id',bookDetail)
    .put('/:id',processEdit)
    .delete('/:id', deleteBook)
module.exports = router;