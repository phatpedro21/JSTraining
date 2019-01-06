var Task = require("./task");

class EnhancedTask extends Task{
    constructor(name, priority){
        super({name:name});
        this.priority = priority;
    }

    notify(){
        console.log("NOTIFY");
    }
    save(){
        this.notify();
        super.save();
    }

}


let eO = new EnhancedTask("WOWO", 2);
eO.save();