//The command pattern encapsulates the calling of a method as an object
//Fully decouples exucution from implementation, allows for a less fragile 
//implementation.
//Also allows for undo operations, and single place auditing,logging


//Creating a local repo to work with
var repo = {
    tasks: {},
    //commands will hold a history of 'commands' executed
    commands: [],
    get:function(id){
        console.log("Getting task " + id);
        return{
            id: id,
            name:"Task: "+ id
        }
    },
    save: function(task){
        repo.tasks[task.id] = task;
        console.log("Saving " + task.name + " to the db");
    },
    replay: function(){
        for (let i = 0; i<this.commands.length;i++)
        {
            let command = repo.commands[i];
            repo.executeNoLog(command.name, command.obj);
        }
    }
}

//Give repo an execute function, takes name of a function and args and
//checks to see if function with that name exists on repo, and tries to call
//it
repo.execute = function(name){

    var args = Array.prototype.slice.call(arguments,1);
    
    //This command list allows us to 'rerun' a set of commands should we need to
    repo.commands.push({
        name:name,
        obj: args[0]
    });
    if(repo[name]){
        return repo[name].apply(repo, args);
    }
    //If func doesnt exist, return false
    return false;
};

//ExecuteNoLog will stop replay adding itself and commands to the history
repo.executeNoLog = function(name){
    var args = Array.prototype.slice.call(arguments,1);
    if(repo[name]){
        return repo[name].apply(repo, args);
    }
    //If func doesnt exist, return false
    return false;
};

let task = repo.execute("get", 3);
repo.execute("save", task);
repo.execute("save", {id:1,name:"TASK I MADE"});

console.log(repo.tasks);

repo.replay();
console.log(repo.tasks);
