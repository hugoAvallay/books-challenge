const express = require('express');
const mainRouter = require('./routes/main');
const booksApiRoutes = require('./routes/books.routes');
const authorsApiRoutes = require('./routes/books.routes')
const methodOverride = require('method-override');


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));



app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);

app.use('/api/books', booksApiRoutes)
app.use('/api/authors', authorsApiRoutes)


app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
