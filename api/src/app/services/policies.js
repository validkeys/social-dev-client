var _ = require('lodash');

// Takes an array of policies and adds them to the default policies
// returning a new array. This will help routes ensure that they don't override default
// policies
exports.withDefaults = function(server, additionalPolicies) {
  var cleanedPolicies = _.flatten([additionalPolicies]);
  var defaultPolicies = server.select('api').connections[0].settings.routes.plugins.policies;
  return [].concat(defaultPolicies).concat(cleanedPolicies);
}