const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
// Debug gets passed 'where we are'
const debug = require('debug')('app');
const sql = require('mssql');

// Config for mssql
const config = {
  user: 'library',
  password: 'Lib-01rary',
  server: 'librarydemo.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'libraryDemo',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};

// Creates our sql connection
sql.connect(config).catch(err => debug(err));

// Creates an instance of our express serve
const app = express();
const port = process.env.PORT || 3001;


// Define nav here, and pass it to other routes so that it is not being hardcoded in every
// render call
const nav = [{ title: "Books", link: "/books" }, { title: "Offers", link: "/offers" }];

// Will log out 'web traffic' info. - 'combined' will be verbose logs, 'tiny' will be quieter logs
app.use(morgan('tiny'));
// Tell express where we are hosting our static files
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
// Tell our app which routers we are using, and tell these routers where their '/' is
const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);

// And where to find our other files
app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index', { title: "Library", nav });
});

app.listen(3000, () => {
  debug(`server now running app on port: ${chalk.green(port)}`);
});
