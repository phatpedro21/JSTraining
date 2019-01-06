//The flyweight pattern aims to conserve memory 
//by sharing portions of an object, between many isntances

//We often have a lot of non unique data between instances
//of an object

//Flyweight pattern only effective if dealing with A LOT of 
//objects, because there is an overhead, which will outway 
//benefits for less amounts of objects.

/*Using a bespoke set up for this example*/

var Task = function(data){
    this.name = data.name;
    this.flyweight = FlyweightFactory.get(data.project,data.priority,
        data.user,data.completed);
    
    //Would then be advised to use protoype getters to access the
    //values of this flyweight,
    
    //this.priority = data.priority;
    //this.project = data.project;
    //this.user = data.user;
    //this.completed = data.completed;
};

function Flyweight(project,priority,user,completed){
    this.priority = priority;
    this.project = project;
    this.user = user;
    this.completed = completed;
};

var FlyweightFactory = function(){
    let flyweights = {};

    //Check to see if we have the 'partial' instance already created
    //create if not, and return it
    let get = function(project,priority,user,completed){
        if(!flyweights[project+priority+user+completed]){
            flyweights[project+priority+user+completed] =
            new Flyweight(project,priority,user,completed)
        }
        return flyweights[project+priority+user+completed]
    };

    let getCount = function(){
        let count = 0;
        for (var fw in flyweights) count++;
        return count;
    }
    return{
        get:get,
        getCount:getCount
    }
}()


function TaskCollection(){
    let tasks = {};
    let count = 0;
    let add = function(data){
        tasks[data.name] = 
            new Task(data);
        count++
    };
    let get = function(name){
        return tasks[name];
    }
    let getCount = function(){
        return count;
    }
    return{
        add:add,
        get:get,
        getCount: getCount
    };
}

let tasks = new TaskCollection();

let projects = ['none','training','production'];
let priortities = [1,2,3,4,5];
let users = ["Peter","Ben","Alfie"];
let completed = [true,false];

let initialMemory = process.memoryUsage().heapUsed;

for (let i = 0; i < 100000; i++){
    tasks.add({
        name:'task'+1,
        priority:priortities[Math.floor((Math.random() * 5))],
        project:projects[Math.floor((Math.random() * 3))],
        user:users[Math.floor((Math.random() * 3))],
        completed:completed[Math.floor((Math.random() * 2))]
    })
}

let afterMemory = process.memoryUsage().heapUsed;
console.log("Memory used " + (afterMemory - initialMemory)/1000000 + " mb");
console.log("Flyweights created:" + FlyweightFactory.getCount());
console.log("Tasks created:" + tasks.getCount());