var TaskRepo = (function(){
    var taskRepo;
    function createRepo(){
        var taskRepo = new Object("Task");
        return taskRepo;
    }
    return {
        getInstance: function(){
            if(!taskRepo){
                taskRepo = createRepo();
            }
            return taskRepo;
        }
    };
    
})();