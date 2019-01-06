'use strict';


/////////////////////////////////////////////
///////////////| MODULE 1 |//////////////////
/////////////////////////////////////////////

//Creating an object literal
var cat = {name:"Al", color:["Black", "White"]};

//We can quickly edit an object
cat.age = 4;

//We can also easily add functions to an object
cat.speak = function() {display("Meow i'm " + this.name)};


cat.speak();
display(cat);


//Creating a 'class' style 'object'

//A constructor
function Dog(name, breed){
  this.name = name;
  this.breed = breed;
}

//The new keyword creates a new empty object, and sets 'this' to
//point to this new object

let dog = new Dog("Worf","Lab");
display(dog);


//The new keyword method above is essentially shorthand for
/*
var dog = Object.create(Object.prototype, 
  {
    name:{
      value: 'Worf',
      enumerable: true,
      writable: true,
      configurable: true
    },
    breed: {
      value: 'Lab',
      enumerable: true,
      writable: true,
      configurable: true
    }
  })
*/

//ANOTHER OPTION, In ES6/2015 also syntaxtic sugar, but 
//similar to traditional class

class Bug {
  constructor(name, legs){
    this.name = name;
    this.legs = legs;
  }
  
  printLegs(){
    let legsString = '';
    if(this.legs%2 == 1)
    {
      legsString += '-';
    }
    for(let i = 0; i < this.legs/2; i++)
    {
      legsString += '{';
    }
    return legsString;
  }
}

let spider = new Bug("Spider", 8);
display(spider.printLegs());


/////////////////////////////////////////////////
////////////////|  MODULE 2  |///////////////////
/////////////////////////////////////////////////

//Usually we will access properties via dot notation
//e.g.

let catName = cat.name;

//However, we can also use bracket notation, WHICH, while unlikely
//to be used often, allows us to deal with 'invalid' property names,
//should we need to

let catColour = cat['colour'];
//invalid propety name example
cat['1. Invalid Prop Name'] = "startswithnumber";

display(cat['1. Invalid Prop Name']);


/* Properties */
//Object Properties have further info (descriptors)
//and these can be seen with...

display(Object.getOwnPropertyDescriptor(cat, 'name'));
//Property Attributes
//-------------------
//writable      -   defines if property can be changed from its 
//                  its initial value

//enumerable    -   defines if a property is 'seen' in for..in loops
//                  or other iteration cases. Also stops a property being 
//                  included in json serialization

//configurable  -   'locks' down a property to prevent configurable
//                  and enumerable attributesbeing changed
//                  and prevents a property being deleted


//These attributes can be set with, for example...
//Object.defineProperty(cat, 'name', {writable: false});

//if a property is an object, you can still change values in 
//that object even if the property is set to no-writable.
//We simply cant change the object the property points to.
//To enforce no change, we can use
//Object.freeze(cat.name);


/* GETTERS AND SETTERS */

//To add a getter or setter we use the following...

//Adding a uppercase name getter to cat
Object.defineProperty(cat, 'upperName', {
  get: function(){
    return this.name.toUpperCase();
  },
  //not good example, but perhaps we want to take uppercase
  //names and camel case them when setting
  set: function(value){
    let formattedName = value.toLowerCase();
    this.name = formattedName;
  }
})

//and use it like so
display(cat.upperName);
cat.upperName = "ALPHONSE";
display(cat.name);



/////////////////////////////////////////////////
////////////////|  MODULE 3  |///////////////////
/////////////////////////////////////////////////


/*Prototypes And Inheritance*/

//Common Example
let arr = ["Red", "Green", "Blue", "Yellow"]

//To get last element of array, we might use
let lastElement = arr[arr.length-1];
display(lastElement);

//However, we could extend our arr objects to allow us
//to call this from the array
Object.defineProperty(arr,'last', { get: function(){
  return this[this.length-1]
}})

display(arr.last);
//However, previous method only works for arr,
//to apply to all 'ARRAY TYPE' objects

Object.defineProperty(Array.prototype,'last', { get: function(){
  return this[this.length-1]
}})

let arr2 = [1,2,3];
display(arr2.last);


//Prototypes
//For functions
/*A function's prototype is the object INSTANCE that will
  become the prototype for all objects created using this
  function as a constructor*/
  
//For objects
/*An object's prototpye is the object INSTANCE from which the object
  is inhertited*/
  
  

  