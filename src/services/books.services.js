const db = require('../database/models');
const createError = require('http-errors')


const getAllBooks = async () => {
    try {
        const books = await db.Book.findAll({
            include: [{ association: 'authors' }]
        })

        return books

    } catch (error) {
        console.log(error);
        throw {
            status: error.status || 500,
            message: error.message
        }

    }
};

const getBookById = async (id) => {
    try {

        if (!id) throw createError(400, 'ID inexistente')


        const book = await db.Book.findByPk(id, {
            include: [{ association: 'authors' }]
        })

        if (!book) throw createError(404, 'Libro no encontrado o Id inexistente');


        return book


    } catch (error) {
        console.log(error);
        throw {
            status: error.status || 500,
            message: error.message
        }
    }
};


module.exports = {
    getAllBooks,
    getBookById,
}