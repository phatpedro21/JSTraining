/*
    Node has introduced the cluster module, that works with child_process.fork to introduce a worker class,
    master functions and events.
            -e.g.       fork 
                        online
                        listen

    The idea of a cluster is to have a master process that manages 'workers' to handle tasks.
*/

let cluster = require('cluster');
var http = require('http');
var numWorkers = 2;

if(cluster.isMaster){
    //Fork workers
    for(var i = 0; i < numWorkers; i++){
        console.log("Creating worker no." + i);
        cluster.fork();
    }

    cluster.on("fork", function(worker){
        console.log("Master: fork event (worker " + worker.id + ")");
    });

    cluster.on("online", function(worker){
        console.log("Master: online event (worker " + worker.id + ")");
    });

    cluster.on("listening", function(worker, address){
        console.log("Master: listening event (worker " + worker.id + " pid: " + worker.process.pid, ", address: " + address + ")");
    });

    cluster.on("exit", function(worker, code, signal){
        console.log("Master: fork event (worker " + worker.id, "code:", code, "signal", signal ,")");
    });
}
//Else we are a worker
else{
    console.log("Worker: worker no. ", cluster.worker.id, " ready to work!");
    var count = 0;

    http.createServer(function(req,res){
        res.writeHead(200);
        //
        count++;
        console.log("Worker: worker no. ", cluster.worker.id, " incrementing count to ", count);
        res.end("Hello world from worker ", cluster.worker.id, "(pid: ", cluster.worker.process.pid);
        if(count == 3){
            cluster.worker.destroy();
        }
    }).listen(3000);

}


