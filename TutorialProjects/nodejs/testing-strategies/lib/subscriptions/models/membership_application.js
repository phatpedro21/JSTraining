const { _ } = require('underscore');
const moment = require('moment');

const MembershipApplication = function(args){

  _.extend(this, args)

  this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10,"days");
  this.expired = function(){
    return this.validUntil.isBefore(moment());
  }

  this.nameIsValid = function(){
    return this.first && this.last;
  }

  this.emailIsValid = function() {
    return this.email && this.email.length > 3 && this.email.indexOf('@') > -1;
  };
  this.ageIsValid = function() {
    return this.age && this.age > 15 && this.age < 100;
  };
  this.heightIsValid = function() {
    return this.height && this.height > 60 && this.height < 75;
  };
  this.weightIsValid = function() {
    return this.weight && this.weight > 100 && this.weight < 300;
  };

  this.validationMessage = function(){
    if(this.isValid()){
      return "Valid Application";
    } else if (!this.emailIsValid()){
      return "Invalid Email";
    } else if (!this.heightIsValid()){
      return "Invalid Height";
    } else if (!this.weightIsValid()){
      return "Invalid Weight";
    }  else if (!this.ageIsValid()){
      return "Invalid Age";
    } else if (this.expired()){
      return "Application Expired";
    };
  }

  this.isValid = function(){
    return this.emailIsValid() &&
            this.heightIsValid() &&
            this.weightIsValid() &&
            this.ageIsValid() &&
            !this.expired();

  };
}

module.exports = MembershipApplication;