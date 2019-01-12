/*
    The process object contains a nymber of properties that allow us to 'interact' with the Local System
    such as
            -Streams (stdin, stdout, stderr)
            -Environment variables
            -process id
            -uptime
            -memory usage
            -methods to change directory, kill processes, set gid/uid 
            -Has a number of events attached too such as exit, uncaughtException ....
            etc...
*/


//The streams provided by Process

//stdin starts paused, to read in we need to resume it
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk){
    process.stdout.write("echo: " + chunk);
});

process.stdin.on('end', function(){
    process.stderr.write("END\n");
});

process.on("SIGTERM", function(){
    process.stderr.write("Why are you trying to terminate me?");
})

console.log("Node isrunning on process id : " + process.pid);