const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// Debug gets passed 'where we are'
const debug = require('debug')('app');

// Creates an instance of our express serve
const app = express();
const port = process.env.PORT || 3001;


// Define nav here, and pass it to other routes so that it is not being hardcoded in every
// render call
const nav = [{ title: "Books", link: "/books" }, { title: "Offers", link: "/offers" }];

// Will log out 'web traffic' info. - 'combined' will be verbose logs, 'tiny' will be quieter logs
app.use(morgan('tiny'));
// Will 'parse' the body of our requests, allowing us to access send params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "pprojlib" }));
 
// Moving our 'lengthy' passport config external from this app file
require('./src/config/passport.js')(app);

// Tell express where we are hosting our static files
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
// Tell our app which routers we are using, and tell these routers where their '/' is
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
// And where to find our other files
app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index', { title: "Library", nav });
});

app.listen(3000, () => {
  debug(`server now running app on port: ${chalk.green(port)}`);
});
