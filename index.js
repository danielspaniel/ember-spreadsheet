/* jshint node: true */
'use strict';
var path = require('path');

module.exports = {
  name: 'ember-spreadsheet',
  isDevelopingAddon: function() { return true; },
  included: function(app) {
    this._super.included(app);
    app.import(path.join(app.bowerDirectory, 'jquery.nicescroll', 'jquery.nicescroll.min.js'));
  },   
 
};
