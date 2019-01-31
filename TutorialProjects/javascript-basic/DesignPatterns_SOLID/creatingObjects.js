////////////////////////////////
////////CREATING OBJECTS////////
////////////////////////////////

/*Curly Brace Method*/
//Quick and easy way to get a one off object
let cbObject = {name:"cbObject", valueA:1,
                introduce:function(){console.log("I am"+name)}
            };


/*Object.create Method*/
//Wrap what we pass in in and object, and return that object
let dotCreateObject = Object.create(Object.prototype);



/*New object method*/
//Creates new empty object.
let newObject = new Object();


////////////////////////////////
////INTERACTING WITH OBJECTS////
////////////////////////////////

/*Dot Notation*/
dotCreateObject.name = "dotCreateObject";
console.log(dotCreateObject.name);


/*Bracket Notation*/
dotCreateObject["value"] = 31;
console.log(dotCreateObject["value"]);

//Bracket notation has advantage of allowing us to use
//expressions for 'accesing' attributes... eg:
let valueAttribute = "value";
console.log(dotCreateObject[valueAttribute]);

