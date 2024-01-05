const express = require('express');
var path = require('path');

const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session')
const localsCheck = require('./middlewares/localsCheck')

const mainRouter = require('./routes/main');
const booksApiRoutes = require('./routes/books.routes');
const authorsApiRoutes = require('./routes/books.routes');
const checkApiRoutes = require('./routes/checkApi.routes')
const cookieCheck = require('./middlewares/cookieCheck');


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));



app.use(methodOverride('_method'));



app.use(session({
  secret : 'recuperatorioEnmarcha',
  resave: false,          
  saveUninitialized: true,
}))


app.use(cookieCheck)
app.use(localsCheck) 

/* app.use((req,res,next) => {
  if(req.session.userLogin){
    res.locals.userLogin = req.session.userLogin
  }
  next()
}) */


app.use('/', mainRouter);

app.use('/api/books', booksApiRoutes)
app.use('/api/authors', authorsApiRoutes)
app.use('/api', checkApiRoutes)


app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
