var should = require('should');
//Mocha will be installed globally
var doubler = require('./evenDoubler');


describe('EvenDoubler', function(){

    describe("When Called syncronously", function(){

        it('should double even numbers correctly', function(){
            doubler.evenDoublerSync(2).should.equal(4);
        })


        //IF WE NEED FOCUS ON ONE TEST, WE CAN USE .ONLY
        //TO SKIP WE CAN USE .SKIP
        it('should throw error if passed odd number', function(done){
                                                    //Here using regex to test the error contains word odd
            (() => {doubler.evenDoublerSync(3)}).should.throw(/Odd/); 
            //Tell mocha that this test is done
            done()          
        })
    })

    describe("When called asynchronously", function(){

        it('should double even numbers correctly', function(done){
            doubler.evenDoubler(2, function(err, results){
                should.not.exist(err);
                results.should.equal(4);
                done();
            }
        )});

        it('should throw error if passed odd number', function(done){                                                    
            doubler.evenDoubler(3, function(err, results){
                should.exist(err);
                should.not.exist(results);
                done();
            })         
        })
    })
})