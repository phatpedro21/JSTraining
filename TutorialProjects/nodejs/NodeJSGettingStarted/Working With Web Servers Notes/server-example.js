const http = require('http')

/*our listener takes a 
    request arg     -
    response arg    -   
*/
const requestListener = (req,res) => {
    //We must have a .end somewhere, otherwise http will keep waiting,
    //thinking we are still streamign data
    res.end("Hellow World\n");

    //Will show us the request object
    console.dir(req, {depth:0});
     //Will show us the response object
     console.dir(res, {depth:0});
}

const server = http.createServer(requestListener);

//our server is an event emitter, and one of its events is called request
//so we could also write
// server.on("request", requestListener)


//Create server only 'creates' the server, to make it listen for requests
//we need to tell it to like so
server.listen(8000, () => {
  console.log('Server is now running...')
})
