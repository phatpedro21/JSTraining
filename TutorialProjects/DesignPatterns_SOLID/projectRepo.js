var repo = function(){

    //DO DATABASE CONNECTION STUFF HERE

    return{
        get: function(id){
            console.log("Fetching project " + id);
            return{
                name: "Project "+ id
            }
        }       
    }
}

module.exports = repo();