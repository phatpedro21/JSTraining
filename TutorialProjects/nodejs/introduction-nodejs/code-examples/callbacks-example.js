/*
    This code shows an example of using callbacks, to allow for aynch processing.
    evenDoubler takes a callback, in this case we pass it handleResults, which is 
    called after evenDoubler has done its task (we simulate delay with setTimeout)
*/

var maxTime = 1000;

var evenDoubler = function(val, cb){
    
    var randTime =  Math.floor(Math.random() * Math.floor(maxTime));
    if(val % 2 != 0)
        var error = new Error("Value is not even");
    else
        var value = val*2;

    setTimeout(cb, randTime, error, value,  randTime);
}

var handleResults = function(err, val, time){
    if(err)
        console.log("Error:" + err.message);
    else
        console.log("Result is: ", val, "(", time, " ms)");
}


evenDoubler(2, handleResults);
evenDoubler(7, handleResults);
evenDoubler(22, handleResults);
evenDoubler(9, handleResults);
console.log('------------');