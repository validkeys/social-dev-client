var Factory = require('factory-girl');

var newFactory    = new Factory.Factory();
var adapter       = require('factory-girl-rethinkdb');
newFactory.setAdapter(adapter);

require('../factories/user')(newFactory);

module.exports = newFactory;