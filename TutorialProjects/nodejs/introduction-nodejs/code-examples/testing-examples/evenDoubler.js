
var maxTime = 1000;

var evenDoubler = function(val, cb){
    
    var randTime =  Math.floor(Math.random() * Math.floor(maxTime));
    if(val % 2 != 0)
        var error = new Error("Value is not even");
    else
        var value = val*2;

    setTimeout(cb, randTime, error, value,  randTime);
};

var evenDoublerSync = function(val){
    if(val%2){
        throw (new Error("Odd input"));
    } else {
        return val * 2;
    }

};
   

module.exports.evenDoubler = evenDoubler;
module.exports.evenDoublerSync = evenDoublerSync;

module.exports.foo = "bar";