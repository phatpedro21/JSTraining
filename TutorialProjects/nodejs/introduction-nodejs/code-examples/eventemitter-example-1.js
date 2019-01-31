/*
    This code shows examples of using nodes EventEmitters, which can be subscribed to and 
    published from to allow other functionality to be called when 'needed'

    This example shows how we can use EventEmitters by returning an event Emitter
*/
var EventEmitter = require('events').EventEmitter;

var getResource = function(dataSet){
    var resEm = new EventEmitter();

    //We need to setImmediate to ensure our .on() 's have registered
    setImmediate(function()  { 
    var _dataSet = dataSet;
    let count = 0;
    resEm.emit("start");    
    for(item of _dataSet){
        resEm.emit("data", item);
        count++;
    }
    resEm.emit("end", count);});

    return resEm;
};

var r = getResource([{name:"Dog", sound:"Bark"},{name:"Cat", sound:"Meow"},{name:"Horse", sound:"Neigh"}, {name:"Sheep", sound:"Baa"}]);

r.on('start', function(){
    console.log("I've started");
});
r.on('data', function(d){
    console.log("I've received: ", d);
});
r.on('end', function(t){
    console.log("I've finished with ", t, " data events");
});





