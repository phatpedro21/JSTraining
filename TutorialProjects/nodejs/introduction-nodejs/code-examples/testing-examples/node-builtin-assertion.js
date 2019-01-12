/*
    We can test our code using Nodes built in assert library

    This library allows for three types of equality test
    assert.equal            - shallow equal, same as ==
    assert.strictEqual      - strict equality, same as ===
    asser.deepEqual         - Identical values are equal
                              Values that are not objects are determined by ==
                              Date objects are equal if refer to same date/time
                              Other objects are equal if they have same number of owned properties,
                              equivalent values for every key and identical prototype


    Assert is not a very user friendly testing library however...
    better to use Mocha, should.js 
                
*/

var assert = require('assert');
var doubler = require('./evenDoubler');

//Testing sync calls
assert.equal(doubler.evenDoublerSync(2), 4);

assert.throws(function(){doubler.evenDoublerSync(9)}, '/Odd/');


//Testing async calls
doubler.evenDoubler(2, function(err, results){
    assert.ifError(err);
    assert.equal(results, 6, "evenDoubler failed on even number");
})

doubler.evenDoubler(2, function(err, results){

    assert.notEqual(err, null);
})
