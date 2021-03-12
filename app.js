"use strict";
const Homey = require("homey");
let extractVariable = [];

//is array?
function isArray(a) {
  return !!a && a.constructor === Array;
}


function addVariable(data) {
  extractVariable.push(data);
  Homey.ManagerSettings.set("extractVariable", extractVariable);
  //Homey.ManagerNotifications.registerNotification("New variable extracted"); // todo: get timeline "variable added" notice to work
}

class variableExtractor extends Homey.App {
  onInit() {
    extractVariable = Homey.ManagerSettings.get("extractVariable");
    if (!isArray(extractVariable)) {
      extractVariable = [];
      console.log("VaEx app init")
    }
    addVariable();
  }
  
  getLog() {
    return extractVariable;
  }

}
module.exports = variableExtractor;

// add variable flow
let actionAddVariable = new Homey.FlowCardAction("addVariable");
actionAddVariable.register().registerRunListener((args, state) => {
  addVariable(args.log);
  console.log("Variable " + args.log + " added");
  return true;
});

// delete flow
let actiondeleteVariable = new Homey.FlowCardAction("deleteVariable");
actiondeleteVariable.register().registerRunListener((args, state) => {
  extractVariable = [];
  addVariable(null);
  console.log("Variables deleted");
  return true;
});