"use strict";
const Homey = require("homey");
let extractedVariables = {};
let emptyObject = null;

//is this an Object?
function isObject(a) {
  return !!a && a.constructor === Object;
}

// add Variable to be extracted
function addVariable(variable) {
  let newVariable = {};
  let oldVariable = Homey.ManagerSettings.get("extractedVariables");

  newVariable = oldVariable + variable;

  Homey.ManagerSettings.set("extractedVariables", newVariable);
};

// delete all variables
function deleteVariable() {
 // let deleteVariable = null
  //deleteVariable = oldVariable + variable;

  Homey.ManagerSettings.set("extractedVariables", emptyObject);
};

/*
function addVariable(data) {
  let extractVariable = Object.assign = ("extractVariable", data);
  Homey.ManagerSettings.set("extractVariable", extractVariable);
  //Homey.ManagerNotifications.registerNotification("New variable extracted"); // todo: get timeline "variable added" notice to work
}
*/
class variableExtractor extends Homey.App {
  onInit() {
    extractedVariables = Homey.ManagerSettings.get("extractedVariables");
  // if (!isObject(extractedVariable)) {
     // extractedVariables = {};
      console.log("VaEx app init")
      console.log(extractedVariables)
    //}
    addVariable();
  }
  
  getExtractedVariables() {
    return extractedVariables;
  }

}


module.exports = variableExtractor;

// add variable flow
let actionAddVariable = new Homey.FlowCardAction("addVariable");
actionAddVariable.register().registerRunListener((args, state) => {
  addVariable(emptyObject + args.log);
  console.log("Variable " + args.log + " added");
  return true;
});

// delete flow
let actiondeleteVariable = new Homey.FlowCardAction("deleteVariable");
actiondeleteVariable.register().registerRunListener((args, state) => {
  deleteVariable(args.log)
  //extractedVariables = {};
  //extractedVariables;
  console.log("Variables deleted " + args.log);
  return true;
});
