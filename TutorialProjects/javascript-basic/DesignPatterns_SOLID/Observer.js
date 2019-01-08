//Observer pattern sets up 'observers' to listen to an event on a 'subject'
//When the 'hear' an event, ovservers will do their thing

//Setting up a task, which will be out subject
var Task = function(data){
    this.name = data.name;
    this.priority = data.priority;
    this.project = data.project;
    this.user = data.user;
    this.completed = data.completed;
};


Task.prototype.complete = function (){
    console.log("completing Task: " + this.name);
    this.completed = true;
};

Task.prototype.save = function(){
    console.log("Saving Task: " + this.name);
}
//We are gonna expand Task to be Observable to avoid making changes to the base
//class which we already know works

var ObservableTask = function(data){
    Task.call(this, data);
    this.observers = new ObserverList();
};

ObservableTask.prototype.addObserver = function(observer){
    this.observers.add(observer);
};
ObservableTask.prototype.notify = function(context){
    var observerCount = this.observers.count();
    for(let i=0; i<observerCount;i++){
        this.observers.get(i)(context);
    }
}
ObservableTask.prototype.removeObserver = function(observer){
    let obsIndex = this.observers.indexOF(observer);
    this.observers.removeAt(obsIndex);
}

//Overwrite observable task save to fire off observers
ObservableTask.prototype.save = function(){
    this.notify(this);
    Task.prototype.save.call(this);
};

//Creating Observerlist 
function ObserverList() {
    this.observerList = [];
};

ObserverList.prototype.add = function(obj){
    return this.observerList.push(obj);
};
ObserverList.prototype.get = function(index){
    if(index > -1 && index < this.observerList.length){
        return this.observerList[index];
    }
};

ObserverList.prototype.count= function(){
    return this.observerList.length;
};

ObserverList.prototype.indexOF = function(observer){
    let i = 0;
    while (i < this.observerList.length){
        if(this.observerList[i] === observer){
            return i;
        }
        i++
    }
    return -1;
}

ObserverList.prototype.removeAt = function(index){
    this.observerList.splice(index,1);
}

//Creating some observers//All the same for demo purposes
//Notification
var notificationService = function(){
    var message = "Notifying";
    this.update = function(task){
        console.log(message+task.user+' for task '+task.name);
    }
}
//Logging
var loggingService = function(){
    var message = "Logging";
    this.update = function(task){
        console.log(message+task.user+' for task '+task.name);
    }
}
//Auditing
var auditingService = function(){
    var message = "Auditing";
    this.update = function(task){
        console.log(message+task.user+' for task '+task.name);
    }
}

// Main "section"

var task1 = new ObservableTask({name:"Make an observer pattern", user:"Peter"});
var notif = new notificationService();
var ls = new loggingService();
var audit = new auditingService();

task1.addObserver(notif.update);
task1.addObserver(ls.update);
task1.addObserver(audit.update);

task1.removeObserver(ls.update);

task1.save();