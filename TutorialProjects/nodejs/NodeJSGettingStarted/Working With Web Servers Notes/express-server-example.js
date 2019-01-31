const express = require('express')


const server = express()

//IF WE ARE USING A TEMPLATING LANGUAGE, e.g. EJS
server.set('view engine', 'ejs');

//In Express, we set up a listener for each URL we want to listen on

//"/" is default url
server.get('/', (req, res) => {
  res.send('Hello From Express')
});

server.get("/about", (req, res) => {
    res.send('ABOUT ME')
});

//This response will make use of an ejs template page.
server.get('/boo', (req, res) => {
    //use .render istead of .send, and this will look in the 'views' folder for a view
    res.render('ghost');
});

server.listen(8000, () => {
  console.log('Express server is running...')
})
