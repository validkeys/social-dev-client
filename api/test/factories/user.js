var   appRoot = require('app-root-path'),
      User    = require(appRoot + "/app/models/user"),
      _       = require('lodash'),
      Faker   = require('faker'),
      Factory = require('../setup/factory');

var modelAttributeNames = _.keys(User.attributes);

var define = function(factory) {
  factory.define('user', User.User, {
    firstName:  Faker.name.firstName(),
    lastName:   Faker.name.lastName(),
    email:      Faker.internet.email(),
    username:   Faker.name.firstName(),
    password:   Faker.internet.password()
  });
};

module.exports = function(factory) {
  define(factory);
};