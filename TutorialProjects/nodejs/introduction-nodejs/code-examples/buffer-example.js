/*
    JavaScript Has difficulty working with binary data, but it is required for many operations.

    The Buffer class provides raw memory allocation for dealign with binary data directly

    Buffers can be converter to and from strings via an encoding

*/

var b = Buffer.alloc(5,"Hello");

console.log(b);

//Buffers are not 'readable' by default
console.log(b.toString());

console.log(b.toString('base64'));

//Can be chained
var v =new Buffer.alloc(6, "Wowwee").toString('base64');

console.log (v);

//Buffers also allow efficient substringing
console.log(b.toString('utf-8', 1, 4));
