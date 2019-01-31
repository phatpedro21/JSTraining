//Modules can be considered as a way to 'group' similar methods
//Almost like a 'toolbox'

//Basically just an object 

//Difference between constructor and module pattern is
//that we are generally only having 'one' of something,
//a set of tools/functionalities....



//This module will handle our (simulated) database calls etc...

//Creating out module as a function allows for private variables
var repo = function(){

    //Would handle db connections here for example,
    //The module functiuons would have access, but external
    //would not

    //DO DATABASE CONNECTION STUFF HERE


    //Privately defined method.
    let save = function(task){
        console.log("Saving " + task.name + " to the db...");
    }

    //The return section is what we want to open up to outside of the module
    return{
        get: function(id){
            console.log("Fetching task " + id);
            return{
                name: "Task "+ id
            }
        },
        //Revealing module pattern is sane, except function is defined
        //'prvately', and simply pointed to in the return, like so...
        save: save        
    }
}

module.exports = repo();