/*
 * input.js: Instance of a single Loggly input
 *
 * (C) 2010 Nodejitsu Inc.
 * MIT LICENSE
 *
 */
 
require.paths.unshift(require('path').join(__dirname, '..'));

var loggly = require('loggly'),
    interns = require('./interns');
 
var Input = function (client, details) {
  if (!details) throw new Error("Input must be constructed with at least basic details.");
  
  this.client = client;
  this._setProperties(details);
};

Input.prototype = {
  log: function (msg, callback) {
    return this.client.log(this.input_token, msg, callback);
  },
  
  addDevice: function (address, callback) {
    this.client.addDeviceToInput(this.id, address, callback);
  },
  
  //
  // Sets the properties for this instance
  // Parameters: details
  //
  _setProperties: function (details) {
    // Copy the properties to this instance
    var self = this;
    Object.keys(details).forEach(function (key) {
      self[key] = details[key];
    });
  }
};

exports.Input = Input;
