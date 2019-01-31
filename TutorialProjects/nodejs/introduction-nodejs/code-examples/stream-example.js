/*
    Streams are an instance of an extended EventEmitter

    They provide a unified abstraction for managing data flow such as...
        -Network traffic
        -File I/O
        -stdin/stdout/stderr 
        -etc...

    A stream is either
        -ReadableStream
        -WritableStream
        -or both

    ReadableStreams can be  pipe'd to a WritableStream
        -Node handes 'backpressure' (where read is faster than write can process)
*/

var request = require('request');
var chalk = require('chalk');
var fs = require('fs');
var zlib = require('zlib');

//READABLE STREAM EXAMPLE
let readStreamExample = function(){
//Request knows to return a stream
let myStream = request("http://www.pluralsight.com/");

myStream.on("data", function(chunk){
    console.log(">>>DATA>>> " + chunk);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n");
});

myStream.on("end", function(){
    console.log(">>>STREAM DONE>>>"); 
});
}

//WRITABLE STREAM EXAMPLE
let writeStreamExample = function(){

    console.log("stdout is writable? : " + process.stdout.writable);

    process.stdout.on("drain", () => { console.log(chalk.red("IM DRAINING?"))});
    process.stdout.on("finish", () => { console.log(chalk.red("IM FINISHED?"))});
    process.stdout.on("pipe", () => { console.log(chalk.red("IM PIPING?"))});      

    process.stdout.write("Hello");
    process.stdout.write("World");

}


//PIPING STREAM EXAMPLE
let pipingExample = function(){
    
    //let myStream = request("http://www.pluralsight.com/");
    //myStream.pipe(process.stdout);
    
    //Does same thing
    let myStream = request("http://www.pluralsight.com/").pipe(process.stdout);

    //Can also write to a file
    request("http://www.pluralsight.com/").pipe(fs.createWriteStream('pluralSight.html'));
}

//WRITABLE AND READABLE
let rwExample = function(){

    //zlib creates a stream the READS uncompressed data and WRITES compressed data
    request("http://www.pluralsight.com/").pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('pluralSight.html.gz'))


}


//readStreamExample();
//writeStreamExample();
//pipingExample();
rwExample();