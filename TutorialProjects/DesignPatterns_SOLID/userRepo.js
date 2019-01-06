var repo = function(){

    //DO DATABASE CONNECTION STUFF HERE

    return{
        get: function(id){
            console.log("Fetching user " + id);
            return{
                name: "User "+ id
            }
        }       
    }
}

module.exports = repo();