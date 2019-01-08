//The Facade pattern provides a simplified interface
//to complicated systems

/*Using a bespoke Task again for demonstration*/

var Task = function(data){
    this.name = data.name;
    this.priority = data.priority;
    this.project = data.project;
    this.user = data.user;
    this.completed = data.completed;
};

var TaskService = function(){
    return{
        complete:function(task){
            task.completed = true;
            console.log("Completing Task " + task.name);
        },
        setCompleteDate:function(task){
            task.completedDate = new Date();
            console.log(task.name + " completed on " + task.completedDate);
        },
        notifyCompletion:function(task,user){
            console.log("Notifying " + user + " on " + task.name);
        },
        save:function(task){
            console.log("saving task: " + task.name);
        }
    }
}();


//Decorators change/add functionality,
//Facades on the other hand simply 'tidy up'
//the existing functionlity
var TaskServiceWrapper = function(){
    
    let completeAndNotify = function(task){
        TaskService.complete(task);
        if(task.completed == true){
            TaskService.setCompleteDate(task);
            TaskService.notifyCompletion(task,task.user);
            TaskService.save(task);
        }
    }
    
    return{
        completeAndNotify:completeAndNotify
    }
}();


let myTask = new Task({
    name:"Task thing to do",
    priority:3,
    project:"Tutorial",
    user:"Peter",
    completed:false
});

TaskServiceWrapper.completeAndNotify(myTask);

