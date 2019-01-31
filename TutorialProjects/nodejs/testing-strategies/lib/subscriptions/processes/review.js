const { EventEmitter } = require('events');
const util = require('util');

let ReviewProcess = function(args){

  let callback;
  //makesure application is valid
  this.ensureAppValid = function(app){
    if(app.isValid()){
      this.emit("validated", app);
    }else{
      this.emit("invalid", app.validationMessage());      
    }
  }
  //find next mission
  this.findNextMission = function(app){
    //stubbed for now 
    app.mission = {
      commander:null,
      pilot: null,
      MAVPilot: null,
      passengers:[]
    }
    
    this.emit("mission-selected", app);
  }

  //make sureselected role is avail
  this.roleIsAvailable = function(app){
    this.emit("role-available", app);
  }

  this.ensureRoleCompatible = function(app){
    this.emit("role-compatible", app);
  };
  
  this.acceptApplication = function(app){
    callback(null, {
      success:true,
      message:"welcome to the mars program"
    })
  };
   
  this.denyApplication = function(message){
    callback(null, {
      success:false,
      message: message
    })
  };
   
  this.processApplication = function(app, next){
    callback = next;
    this.emit("application-recieved", app);
  };

  //Event path/chain
  this.on("application-recieved", this.ensureAppValid);
  
  //successful app
  this.on("validated",this.findNextMission);
  this.on("mission-selected",this.roleIsAvailable);
  this.on("role-available",this.ensureRoleCompatible);
  this.on("role-compatible",this.acceptApplication);

  //unsuccessful app
  this.on("invalid", this.denyApplication);

};


util.inherits(ReviewProcess, EventEmitter);
module.exports = ReviewProcess;