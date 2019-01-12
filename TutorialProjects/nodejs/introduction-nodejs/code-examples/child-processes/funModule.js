process.on('message', function(m){

    if(m.cmd === "babble"){
        console.log("Im going to babble");
        var words = ["hey","am","do","like","might","become","yule"];
        var length = (m.length < words.length ? m.length : words.length);
        var string = "";
        for(let i = 0; i < length; i++){
            string += (words[i] + " ");
        }
        process.send({answer:string});
    }
    else if(m.cmd === "double"){        
        console.log("Im going to double");
        process.send({answer:(m.length * 2)});

    }else if(m.cmd === "done"){
        console.log("Bye bye");
        process.exit();
    };

})