import { thinky } from '../../initializers/database';
import _ from 'lodash';
import Boom from 'boom';
import Promise from 'bluebird';
import * as PasswordService from '../../services/password';

let type    = thinky.type;
var User    = null;

const attributes = {
  id:         type.string(),
  firstName:  type.string().min(1),
  lastName:   type.string().min(1),
  username:   type.string().alphanum().min(3),
  email:      type.string().email(),
  password:   type.string().min(4),
  createdAt:  type.date().default(thinky.r.now()),
  updatedAt:  type.date().default(thinky.r.now())
};

User = thinky.createModel('users', attributes);

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
  // if the record is new save right away
  if (!this.isSaved()) {
    this.password = PasswordService.encrypt(this.password);
  }
  next();
});

// Ensure email is unique
User.pre('save', function(next) {
  var self = this;
  require('../../lib/models/ensure-unique')("User", "email", self, next);
});

User.pre('save', function(next) {
  var self = this;
  require('../../lib/models/ensure-unique')("User", "username", self, next);
});


// Instance Methods
User.define('jwtAttributes', function() {
  return _.pick(this, ['id','firstName','lastName','username','email','createdAt']);
});

let register = function(server, options, next) {

  User.addListener('ready', (model) => {
    console.log("Table: " + model.getTableName() + " is ready");
    next();
  });

};

register.attributes = {
  pkg: require('./package.json')
};


export { attributes, User, register };