const path = require('path');
const fs = require('fs');

const files = ['.npmrc',  'dog.txt', '.viminfo'];


files.forEach( file => {

    //If we do not handle the fact that a file may not exist, the code will simply crash out.
    //As we know this may happen, we can make an exception for it and handle it gracefully.
    
    
    //Try catch allows us to attempt a process, but give instructions on what to do if it fails
    try{
        const filePath = path.resolve(process.env.USERPROFILE, file);
        const data = fs.readFileSync(filePath);
        console.log("File Data is " , data);
    }
    catch(err){        
        if(err.code === "ENOENT"){
            console.log("File: ", file, ", not found: ");
        }           
        //If we don't know what the issue is, better to let it crash out
        else
            throw err;
    }
});


