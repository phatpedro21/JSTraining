/*
    This code shows examples of using nodes EventEmitters, which can be subscribed to and 
    published from to allow other functionality to be called when 'needed'

    This example shows how we can Extend the EventEmitter Class

*/
var Resource = require('./eventemitter-example-2.2');

var r = new Resource(5);
r.on('start', function(){
    console.log("I've started");
});
r.on('data', function(d){
    console.log("I've received: ", d);
});
r.on('end', function(t){
    console.log("I've finished with ", t, " data events");
});





