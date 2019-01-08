//Decorator Pattern adds new functionality to existing 
//objects with out being obtrusive

//Using our existing Task object,
//we'd like to add functionality, without having
//to change the way the core task object works.

var LocalTask = function(name){
    this.name = name;
    this.completed = false;
}

LocalTask.prototype.complete = function() {
    this.completed = true;
    console.log("Task " + this.name + " completed" );
}
LocalTask.prototype.save = function() {
    console.log("Task " + this.name + " saved" );
}


let enhancedClass = new LocalTask("URGENT");
enhancedClass.priorty = 2;

//This is a simple example of 'decorating'
//the basic Task object....
enhancedClass.notify = function(){
    console.log("SENDING A NOTIFICATION");
}
//We could then decorate the save function to also call notify
enhancedClass.save = function(){
    this.notify();
    LocalTask.prototype.save.call(this);
}
enhancedClass.save();
enhancedClass.notify();

//WHAT if we wanted to create more than one new enhancedObj
//The current method would need us to add the new functions
//etc.. for each new one we created. The solution is...

//create a new 'constructor' for our enhanced object
var enhancedObject = function(name, priority){
    LocalTask.call(this, name);    
    this.priority = priority;
};
//We need to 'add' the task prototype to the enhanced
//task to access functions, but we can't just assign 
//the prototype or changes made to one will affect all

//So we crate a copy to assign
enhancedObject.prototype = Object.create(LocalTask.prototype);
enhancedObject.prototype.notify = function(){
    console.log("SENDING A NOTIFICATION");
}
//We could then decorate the save function to also call notify
enhancedObject.prototype.save = function(){
    this.notify();
    LocalTask.prototype.save.call(this);
}
let eo = new enhancedObject("ENHANCE", 4);
console.log(eo);
eo.save();