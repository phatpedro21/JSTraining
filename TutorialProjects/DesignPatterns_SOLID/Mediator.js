//The mediator pattern alows us to handle 'observer' situations in a much less
//coupled way. A mediator object manages the communication between objects.
//Allows for many to many relationships

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

//Creating out mediator object
var mediator = (function(){
    //Mediator has a number of channels, which can be subscribed to
    var channels = {};

    var subscribe = function(channel, context, func){
        if(!mediator.channels[channel]){
            mediator.channels[channel] = [];
        }
        mediator.channels[channel].push({
            context:context,
            func:func
        });
    }

    var publish = function(channel){
        if(!this.channels[channel]){
            return false;
        }

        //The args to pass to the subscriber being called
        //splice first arg because that will be channel
        var args = Array.prototype.slice.call(arguments, 1);
        
        for(let i = 0; i< mediator.channels[channel].length; i++)
        {
            //For every subscriber to the channel
            var sub = mediator.channels[channel][i];
            //execute the method to be called
            sub.func.apply(sub.context, args);
        }
    }
    return{
        channels: {},
        subscribe,
        publish
    }

}());


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
    this.update = function(task, date){
        console.log(message+task.user+' for task '+task.name + " On: " + date);
    }
}

// Main "section"

var task1 = new Task({name:"Mediator Demo", user:"Peter"});
var notif = new notificationService();
var ls = new loggingService();
var audit = new auditingService();

//Add all to complete channel
mediator.subscribe('complete', notif, notif.update);
mediator.subscribe('complete', ls, ls.update);
mediator.subscribe('complete', audit, audit.update);
//Add audit to audit channel
mediator.subscribe('audit', audit, audit.update);

//Decorate task1 complete function to publish to channel
task1.complete = function(){
    mediator.publish('audit', this, "02/05/1995");
    Task.prototype.complete.call(this);
}

task1.complete();
