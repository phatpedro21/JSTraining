const assert = require('assert');
const MembershipApplication = require('../models/membership_application');

describe("Mission Application Validations", function(){
  let validApplication;
  before(function(){
    //arrange data
    validApplication = new MembershipApplication({
      first:"Test",
      last:"User",
      email:"test.user@email.com",
      height:66,
      age:23,
      weight:230,
      validUntil:Date.parse("01/01/2025")
    });
  });
  describe("Application valid if...", function(){
    it("application is valid if all validators return true", () => {   
      assert(validApplication.isValid(), "Application is not valid");
    });   
  })
  describe("Application not valid if...", function(){
    it("is past the validUntil date", () => {
      let badApp = new MembershipApplication({validUntil:Date.parse("01/01/2001")});
      assert(badApp.expired(), "expired application being accepted");
    });    
    it("email is less than 4 chars",() => { 
      let badApp = new MembershipApplication({email:"E@A"});  
      assert(!badApp.emailIsValid(), "invalid email being accepted");
    });
    it("email does not contain @",() => { 
      let badApp = new MembershipApplication({email:"Eww.www"});   
      assert(!badApp.emailIsValid(), "invalid email being accepted");
    });
    it("first name is missing",() => { 
      let badApp = new MembershipApplication({});   
      assert(!badApp.nameIsValid(), "invalid name being accepted");
    });
    it("last name is missing",() => { 
      let badApp = new MembershipApplication({});   
      assert(!badApp.nameIsValid(), "invalid name being accepted");
    });
    it("weight is greater than 300",() => { 
      let badApp = new MembershipApplication({weight:2000});   
      assert(!badApp.weightIsValid(), "invalid weight being accepted");
    });
    it("weight is less than 100",() => { 
      let badApp = new MembershipApplication({weight:20});   
      assert(!badApp.weightIsValid(), "invalid weight being accepted");
    });
    it("weight is ommited",() => { 
      let badApp = new MembershipApplication({});   
      assert(!badApp.weightIsValid(), "invalid weight being accepted");
    });    
  })
})