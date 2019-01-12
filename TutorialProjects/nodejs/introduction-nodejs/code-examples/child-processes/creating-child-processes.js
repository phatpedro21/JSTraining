/*
    There are 4 ways to create child processed using the child_process module.

    spawn(command, [args], [options])
        -launches a new process with command and args
        -returns a child process which is an event emitter (with exit and close events)
        -returned proces also has stdin/out/err streams that are accesible

    exec(command, [options], callback)
        -runs command arg in a shell
        -callback is invoked on prcoess completion, with error, stdout, sterr

    execFile(file, [args], [options], callback)
        -similar to exec but file is executed directly, rather than in a sub shell
    
    fork(modulePath, [args], [options])
        -Special version of spawn optimised for creating NodeProcesses
        -Adds a 'send' function and 'message' event to the ChildProcess
*/

var child_process = require('child_process');


//EXEC EXAMPLE
var execExample = function(){

    //Creating a child process to run ls
    var child = child_process.exec('cd', function(err, stdout, stderr){
        if(err){
            console.log("Error: " + stderr);
        } else {
            console.log("Output is: " + stdout);
        }

    });

    console.log("PID: " + child.pid);
}

//SPAWN EXAMPLE (gives us more control, with the ability to use stdin and stdout while it is running)
var spawnExample = function(){

    //Creating two child processes         
    var ps = child_process.spawn('ps', ['aux']);
    var grep = child_process.spawn('grep', ['node']);
    
    //Will get list of processes with ps process, pipe that into grep
    ps.stdout.pipe(grep);
    //grep will then pipe its results to parent stdout
    grep.stdout.pipe(process.stdout);

    //Can also watch for events
    ps.stderr.on('data', function(data){
        console.log('ps stderr: ' + data)
    })
    grep.stderr.on('data', function(data){
        console.log('grep stderr: ' + data)
    })
}

//FORK EXAMPLE
var forkExample = function(){

    //Create child process running another js script with node
    var child = child_process.fork(__dirname + '/funModule.js');

    child.on('message', function(m){
        console.log("The answer is: ", m.answer);
        child.send({cmd:'done'});
    })

    child.send({cmd:'babble', length:5});
}

//execExample();

//Will not work on windows...
//spawnExample();


forkExample();