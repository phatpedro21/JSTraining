'use strict'

var x = 0x22;

console.log(x);



///Async await examples
function asyncMethod(message, num){
    return new Promise(function(fulfill, reject){
        setTimeout(function(){
        console.log(message + " : " + num);
        //In our callback, increment num (this will be returned)
        fulfill(num + 1);
        }, 500)

    }); 
}

//We define an async method (here we call it main), and then prefix each 'step' with await

//We are assigning them to values to show that we can 'capture' the 'result' of each call,
//to use later

async function main(){
    //Pass 1 to the first call, and then set up the next calls to take the result from the 
    //previous call.
    let one = await asyncMethod("Open DB Connection", 0);
    let two = await asyncMethod("Validate User", one);
    let three = await asyncMethod("Find User", two); 
    let four = await asyncMethod("Do Stuff", three);    
}

main();