'use strict';

//Including our task constructor
var Task = require('./task');
var RepoFactory = require('./repoFactory');

console.log("Today we are going to look at design patterns\n " +
            "and how the can be implemented in JS");


//Design patterns look to "solve problems".

//Design Patterns allow us to not have to 'resolve' issues
//and also give us a common vocabulary, enabling better
//communication.

//There are three "Types" of design Pattern

/*
Creational              | Structural              Behavioural
------------------------|-----------------------|------------------------
(When we want to        | (Deal with the make   | (Handle how objects relate
new instances of an     |  up of objects)       |  and operate with each other)
object)                 |                       |   
                        |                       |
-Constructor            | -Decorator            | -Command 
-Module                 | -Facade               | -Mediator      
-Factory                | -Flyweight            | -Observer
-Singleton              |                       |
                        |                       |
*/


//Using out repo to fetch a task
let fetchedTask = new Task(RepoFactory.getRepo('task').get(14));

console.log(fetchedTask);

//Creating some tasks
let task1 = new Task({name:"Fix a bug"});
let task2 = new Task({name:"Correct Typo line 19"});
let task3 = new Task({name:"UI overhaul"});

fetchedTask.save();
task1.save();
task2.save();
task3.save();