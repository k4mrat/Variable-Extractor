"use strict";
const Homey = require("homey");

module.exports = [
  {
    description: "Get extracted variable",
    method: "GET",
    path: "/variable",
    requires_authorization: true,
    public: true,
    fn: function (Variables, callback) {
     let extractedVariables = Homey.ManagerSettings.get("extractedVariables");
      //let extractedVariables = Homey.app.getExtractedVariables();
      return callback(null, extractedVariables);
    },
  },
];
