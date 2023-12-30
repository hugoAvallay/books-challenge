const bcryptjs = require('bcryptjs');
const db = require('../database/models');

const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  /* ------------------------------------------------------------------------------- */
  bookDetail: async (req, res) => {
    // Implement look for details in the database

    try {
      const book = await db.Book.findByPk(req.params.id, {
        include: [{ association: 'authors' }]
      })

      if (!book) {
        return res.status(404).send('Libro no encontrado');
      }

      return res.render('bookDetail', {
        book
      })

    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  /* --------------------------------------------------------------------- */
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: (req, res) => {
    // Implement search by title
    res.render('search');
  },
  deleteBook: (req, res) => {
    // Implement delete book
    res.render('home');
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },

  /* ------------------------------------------------------------------------ */

  authorBooks: async (req, res) => {
    // Implement books by author
    try {
      const author = await db.Author.findByPk(req.params.id, {
        include: [{ model: db.Book, as: 'books' }],
      });
    
      if (!author) {
        return res.status(404).send('Autor no encontrado');
      }
    
      res.render('authorBooks', { author });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
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
            edit: (req, res) => {
              // Implement edit book
              res.render('editBook', { id: req.params.id })
            },
              processEdit: (req, res) => {
                // Implement edit book
                res.render('home');
              }
  };

  module.exports = mainController;
