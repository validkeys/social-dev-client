// This will attempt to fetch restful objects
// /users/{user_id} etc..
var _           = require('lodash'),
    Models      = global.reqlib('/app/models'),
    Promise     = require('bluebird');

// Converts from user_id to User
// from user_story_id to UserStory
function camelize(str) {
  return str.split('_id')[0].replace('_',' ').replace(/(?:^|\s)\w/g, function(match){
    return match.toUpperCase();
  }).replace(' ','');
}

var fetchObject = function(request, reply, next) {

  if (request.params.length === 0 || ['GET','PUT','DELETE'].indexOf(request.method.toUpperCase()) === -1 ) { next(null, true); }

  var promises = [];

  _.each(request.params, function(value, key) {
    var model = camelize(key),
        table = Models[model][model];

    if (table) {
      promises.push(table.get(value).run());
    } else {
      console.log("Could not fetch: " + key + " with value: " + value + " with model: " + model);
      next(null, true);
    }

  });

  Promise
    .all(promises)
    .then(function(results) {
      console.log("GOT RESULTS!", results);
      _.each(results, function(res) {
        console.log("MODEL" + res.getModel());
      });
      next(null, true)
    })

  // next(null, true);
};

module.exports = fetchObject;