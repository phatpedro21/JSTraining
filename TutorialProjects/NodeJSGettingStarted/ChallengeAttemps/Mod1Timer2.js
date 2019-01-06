//Print Hello World every second, 5 times
//Then print Done and exit

var counter = 0

function printer()
{
    if(counter < 5){
        console.log("Hello World");
    }
    else{
        console.log("Done");
        clearInterval(intID);
    }
    counter++;
}

var intID = setInterval(printer, 1000);

