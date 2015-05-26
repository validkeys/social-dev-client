// This will attempt to fetch restful objects
// /users/{user_id} etc..
// it loops through each param in the url and
// attempts to fetch them
// it then attaches them to request.data[Model]
var _           = require('lodash'),
    Models      = global.reqlib('/app/models'),
    Promise     = require('bluebird'),
    Pluralize   = require('pluralize');

// Converts from user_id to User
// from user_story_id to UserStory
function camelize(str) {
  return str.split('_id')[0].replace('_',' ').replace(/(?:^|\s)\w/g, function(match){
    return match.toUpperCase();
  }).replace(' ','');
}

var fetchObject = function(request, reply, next) {
  console.log("Fetching Object!");
  if (request.params.length === 0 || ['GET','PUT','DELETE'].indexOf(request.method.toUpperCase()) === -1 ) {
    return next(null, true);
  }

  var promises = {};

  _.each(request.params, function(value, key) {
    var model = camelize(key),
        table = Models[model][model];

    if (table) {
      promises[model] = table.get(value).run();
    } else {
      console.log("Could not fetch: " + key + " with value: " + value + " with model: " + model);
    }

  });

  // Nothing to fetch
  if (_.keys(promises).length === 0){ return next(null, true); }

  Promise
    .props(promises)
    .then(function(results) {
      _.each(results, function(record, modelKey) {
        request.data = request.data || {};
        request.data[modelKey] = record;
      });
      console.log("Continuing!");
      return next(null, true);
    })
    .catch(function(e) {
      next(e, false);
    });
};

module.exports = fetchObject;