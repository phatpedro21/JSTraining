//the Factory pattern ...
//-Simplifies object creation
//-Helps creating different objects based on needs

var repoFactory = function(){
        this.getRepo = function(repoType){
            if(repoType === 'task'){
                //If we have made an instance already, use it
                if (this.taskRepo){
                    return this.taskRepo;
                }
                //Else new up an isntance to use 
                else {
                this.taskRepo = require('./taskRepo');
                return this.taskRepo;
                }                
            }
            if(repoType === 'user'){
                var userRepo = require('./userRepo')();
                return userRepo;
            }
            if(repoType === 'project'){
                var projectRepo = require('./projectRepo')();
                return projectRepo;
            }
        }
}

/*For cleaner syntax, calling etc... we can also make a factory like so

var repoFactory = function(){
    var repos = this;
    var repoList = [{name:'task', source:'./taskRepo'},
                    {name:'user', source:'./userRepo'},
                    {name:'project', source:'./projectRepo'}];

    repoList.forEach(function(repo){
        repos[repo.name] = require(repo.source)();
    });
};

//Can then call just repoFactory.task.save or repoFactory.user.get
//When needed
*/

module.exports = new repoFactory;
