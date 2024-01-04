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
            message: error.message || 'Ups, hubo un error :('
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
            message: error.message || 'Ups, hubo un error :('
        }
    }
};

const updateBook = async (id, dataBook) => {

    try {

        const { title, cover, description } = dataBook

        const book = await db.Book.findByPk(id, {
            include: ['authors']
            /* include: [{ association: 'authors' }] */
        })

        book.title = title || book.title;
        book.cover = cover || book.cover;
        book.description = description || book.description;

        await book.save()

        return book

    } catch (error) {
        console.log(error);
        throw {
            status: error.status || 500,
            message: error.message || 'Ups, hubo un error :('
        }
    }


};

const destroyBook = async (bookId) => {


    try {

        const bookToDelete = await db.Book.findByPk(bookId, {
            include: [{ model: db.Author, as: 'authors' }],
        });

/*         if (!bookToDelete) {
            throw new Error('Libro no encontrado');
        } */

        await bookToDelete.removeAuthors(bookToDelete.authors);

        await bookToDelete.destroy();
        
                return null 

    } catch (error) {
        console.log(error);
        throw {
            status: error.status || 500,
            message: error.message || 'Ups, hubo un error :('
        }
    }

};

module.exports = {
    getAllBooks,
    getBookById,
    updateBook,
    destroyBook
}