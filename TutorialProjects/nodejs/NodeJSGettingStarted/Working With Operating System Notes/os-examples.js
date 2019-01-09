const os = require('os');

console.log("OS Platform: ", os.platform());

console.log("OS CPU Architecture: ", os.arch());

console.log("# of Logical Cores: ", os.cpus().length);

console.log("Home Directory of current User: ", os.homedir());

console.log("line1" + os.EOL + "line2" + os.EOL + "line3");

