var thinky  = require('../../initializers/database').thinky,
    type    = thinky.type,
    _       = require('lodash'),
    User    = null,
    Boom    = require('boom'),
    Promise = require('bluebird');

User = thinky.createModel('users', {
  id:         type.string(),
  firstName:  type.string().min(1),
  lastName:   type.string().min(1),
  username:   type.string().alphanum().min(3),
  email:      type.string().email(),
  password:   type.string().min(4),
  createdAt:  type.date().default(thinky.r.now()),
  updatedAt:  type.date().default(thinky.r.now())
});

// Indeces
User.ensureIndex("email", function(doc) {
  return doc('email');
});

User.ensureIndex("username", function(doc) {
  return doc('username');
});

// Hooks
// update the updatedAt
User.pre('save', function(next) {
  this.updatedAt = thinky.r.now();
  next();
});

// Generate password salt
User.pre('save', function(next) {
  if (!this.isSaved()) {
    // generate for sure
    console.log("Salt password");
  } else {
    var old = this.getOldValue();
    console.log("OLD", old);
    // var oldValue = this.getOldValue().password;
    // if (oldValue !== this.password) {
    //   // salt
    //   console.log("Old value not eq to new value. Salt!");
    // }
  }
  next();
});

// Ensure email is unique
User.pre('save', function(next) {
  var self = this;
  require('../../utils/models/ensure-unique')("User", "email", self, next);
});

User.pre('save', function(next) {
  var self = this;
  require('../../utils/models/ensure-unique')("User", "username", self, next);
});


// Instance Methods
User.define('jwtAttributes', function() {
  return _.pick(this, ['id','firstName','lastName','username','email','createdAt']);
});

exports.register = function(server, options, next) {

  User.addListener('ready', function(model) {
    console.log("Table: " + model.getTableName() + " is ready");
    next();
  });

};

exports.register.attributes = {
  pkg: require('./package.json')
};

exports.User = User;