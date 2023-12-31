const db = require('../database/models');
const createError = require('http-errors');

const getAllAuthors = async () => {
    try {
        const authors = await db.Author.findAll()

        return authors

    } catch (error) {
        console.log(error);
        throw {
            status: error.status || 500,
            message: error.message
        }

    }
};

const getAuthorById = async (id) => {
    try {

        if (!id) throw createError(400, 'ID inexistente')


        const author = await db.Author.findByPk(id, {
            include: [{ model: db.Book, as: 'books' }],
          });

        if (!author) throw createError(404, 'Libro no encontrado o Id inexistente');


        return author


    } catch (error) {
        console.log(error);
        throw {
            status: error.status || 500,
            message: error.message
        }
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById
}