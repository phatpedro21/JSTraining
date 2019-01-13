const assert = require('assert');
const sinon = require('sinon');
const ReviewProcess = require('../processes/review');
const MembershipApplication = require('../models/membership_application');

describe("The review process", () => {
  describe("Receiving a valid application", ()=>{    
    let decision;    
      //arrange data
      let validApplication = new MembershipApplication({
        first:"Test",
        last:"User",
        email:"test.user@email.com",
        height:66,
        age:23,
        weight:230,
        validUntil:Date.parse("01/01/2025")
      });
      const review = new ReviewProcess();         
      const validationSpy = sinon.spy();
      const missionselectedSpy = sinon.spy();
      const roleAvailableSpy = sinon.spy();
      const roleCompatibleSpy = sinon.spy();
      //To use sinon with callback / events we have to take extra step
      review.on("validated", validationSpy); 
      review.on("mission-selected", missionselectedSpy); 
      review.on("role-available", roleAvailableSpy); 
      review.on("role-compatible", roleCompatibleSpy); 
    before(function(done){  
      review.processApplication(validApplication, (err, result) => {
        decision = result;        
        done();
      });
    });

    it("returns success", () => {
      assert(decision.success, decision.message);    
    });
    it("Calls validation", () => {
      assert(validationSpy.called);
    });
    it("Calls mission-select", () => {
      assert(missionselectedSpy.called);
    });
    it("Checks role available", () => {
      assert(roleAvailableSpy.called);
    });
    it("Checks role compatible", () => {
      assert(roleCompatibleSpy.called);
    });    
  });
});
