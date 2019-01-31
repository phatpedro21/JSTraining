/*
    This is the extracted event emitter code
*/

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Resource(m){    
    var maxEvents = m;
    var self = this;    

    //We need to setImmediate to ensure our .on() 's have registered
    setImmediate(function()  {     
    let count = 0;
    self.emit("start");    
    for(let i = 0; i < maxEvents; i++){
        self.emit("data", count++);        
    }
    self.emit("end", count);});
};


util.inherits(Resource, EventEmitter);

module.exports = Resource;