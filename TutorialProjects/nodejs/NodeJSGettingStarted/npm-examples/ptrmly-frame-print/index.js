console.log("UNDER CONSTRUCTION");


module.exports = function print(text, border='*'){
    
    let borderString = '';
    for(let i = 0; i < text.length + 4; i++)
        borderString += border;

    console.log(borderString);
    console.log(border + " " + text + " " + border);
    console.log(borderString);
}