const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op } = require('sequelize');
const { getAllBooks, getBookById, updateBook, destroyBook } = require('../services/books.services');
const createError = require('http-errors');
const { getAllAuthors, getAuthorById } = require('../services/authors.services');

const mainController = {
  home: async (req, res) => {
    try {
      const books = await getAllBooks()

      return res.render('home', { books });

    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || 'Upss, hubo un error :('
      })
    }

  },
  /* ------------------------------------------------------------------------------- */
  bookDetail: async (req, res) => {
    // Implement look for details in the database

    try {
      const book = await getBookById(req.params.id)
      return res.render('bookDetail', {
        book
      })

    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || 'Upss, hubo un error :('
      })
    }
  },

  /* --------------------------------------------------------------------- */
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: async (req, res) => {
    try {
      const searchTerm = req.body.title;

      /* if (!searchTerm) throw createError(404, 'El campo de búsqueda está vacío.'); */

      const books = await db.Book.findAll({
        where: {
          title: { [Op.like]: `%${searchTerm}%` },
        },
      });

      res.render('search', { books, searchTerm });

    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || 'Upss, hubo un error :('
      })
    }
  },

  deleteBook: async (req, res) => {
    // Implement delete book

    try {

      await destroyBook(req.params.id);
      res.redirect('/');
    
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || 'Upss, hubo un error :(',
      })
    }

  },
  /* -------------------------------------------------------------------------------- */
  authors: async (req, res) => {
    try {
      const authors = await getAllAuthors()

      return res.render('authors', { authors });

    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || 'Upss, hubo un error :('
      })
    }

  },

  /* ------------------------------------------------------------------------ */

  authorBooks: async (req, res) => {
    // Implement books by author
    try {
      const author = await getAuthorById(req.params.id)
      return res.render('authorBooks', { author });

    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || 'Upss, hubo un error :('
      })
    }

  },
  /* ------------------------------------------------------------------------------- */
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },


  /* -------------------------------------------------------------------------- */

  edit: async (req, res) => {
    // Implement edit book
    try {
      const book = await db.Book.findByPk(req.params.id);
      return res.render('editBook', { book })
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || 'Upss, hubo un error :('
      })
    }

    /*  res.render('editBook', { id: req.params.id }) */

  },


  processEdit: async (req, res) => {
    // Implement edit book

    try {

      const bookEdit = await updateBook(req.params.id, req.body)

      return res.redirect(`/books/detail/${req.params.id}`);
      /* return res.status(200).json({
        ok: true,
        msg: 'El libro fue actualizada con exito',
        url: `${req.protocol}://${req.get("host")}/api/books/${bookEdit.id}`
      }) */


    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || 'Upss, hubo un error :('
      })
    }
  }
};

module.exports = mainController;
