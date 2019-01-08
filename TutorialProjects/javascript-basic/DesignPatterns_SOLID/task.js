var Repo = require("./taskRepo");

class Task {
    constructor(data){
        this.name=data.name;
        this.completed=data.completed || false; 
    };
    complete(){
        this.completed = true;
    };
    save(){
        //SAVE TO DB
        Repo.save(this);
        console.log(this.name + " has been saved");
    };
}

module.exports = Task;