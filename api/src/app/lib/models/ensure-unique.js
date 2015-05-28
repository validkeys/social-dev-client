// will do a query based on a single field
// and return whether or not the field is unique
// if the instance is a created model, it will 
// ensure that it's not finding it's own record

var Models  = require('../../models'),
    Promise = require('bluebird');

module.exports = function(tableName, field, instance, next) {

  if (!Models[tableName] || !Models[tableName][tableName]){ return next(new Error(tableName + "not found in models export")); }
  var model       = Models[tableName][tableName],
      filterFunc  = null;

  if (instance.isSaved()) {
    filterFunc = function(item) {
      return item(field).eq(instance[field]).and(item("id").ne(instance.id));
    };
  } else {
    filterFunc = function(item) {
      return item(field).eq(instance[field]);
    }
  }

  model
    .filter(filterFunc)
    .run()
    .then(function(results) {
      if (results.length > 0) {
        return next(new Error(field + " is not unique in " + tableName));
      }
      next();
    })
    .catch(function(e) {
      next(e);
    });
}