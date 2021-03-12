"use strict";
const Homey = require("homey");

module.exports = [
  {
    description: "Get extracted variable",
    method: "GET",
    path: "/variable",
    requires_authorization: true,
    public: true,
    fn: function (data, callback) {
      let log = Homey.app.getLog();
      return callback(null, log);
    },
  },
];
