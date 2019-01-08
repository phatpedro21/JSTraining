let aVar = 10;
{
    let aVar = 20;
}
console.log("Block scope example: " + aVar);



let myFunc = function(user="Default", colour="Red", number=1)
{   
    console.log(`Hello ${colour} ${user} : ${number}`);
}
console.log("\n\nDefault Param Example")
myFunc();
myFunc("Peter", undefined, 3); 


let defaultParamsFunc2 = function(number, magicNumber=number*3){
    console.log("num: " + number + " | mNum: " + magicNumber);
}
defaultParamsFunc2(3); //will print "num: 3 | mnum: 9"
defaultParamsFunc2(3,5); //will print "num: 3 | mnum: 5"



console.log("\n\n...Rest examples");
//This function will take any number of args, and return the one in the index
//specified by the second param (if possible)
let restFunc = function(a, index, ...others)
{
    if(index <= (others.length-1))
        console.log(others[index]);
}
restFunc(10,1, 30, 46, 100, 53);

let numbersArr = [10,42,67,32,11,34];
//Doesnt work as numbersArr is not a number
//console.log(Math.max(numbersArr));
//Receives numbersArr as individual nums and works as expected
console.log(Math.max(...numbersArr));




console.log("\n\n...Object Literal examples");

var name = "VarName", number=123;
var anObject = {
    "long name with spaces": 45,
    "otherName": 22,
    //Will set a property named VarName-123
    [name + "-" + number]: 123,
    //also works for functions
    "function name"(){
        //do thing
    }
}

console.log(anObject);
console.log(anObject["VarName-123"]);
console.log(anObject.otherName);
console.log(anObject["long name with spaces"]);




console.log("\n\nDestructuring Examples");

let results = ['200', '335', '456'];

let [a, b, c, d, e="999"] = results;

console.log(d)  //prints undefined;
console.log(e)  //prints "999";