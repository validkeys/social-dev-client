import Ember from 'ember';

function getParameterByName(url, name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(url);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Ember.Test.registerHelper('hasQueryParam', function(app, url, paramName) {
  return getParameterByName(url, paramName) ? true : false;
});

Ember.Test.registerHelper('queryParamHasValue', function(app, url, paramName, expectedValue) {
  var param = getParameterByName(url, paramName);
  return (getParameterByName(url, paramName)) ? (param === expectedValue) ? true : false : false;
});

Ember.Test.registerHelper('queryParamValue', function(app, url, paramName, expectedValue) {
  var param = getParameterByName(url, paramName);
  return getParameterByName(url, paramName);
});

export default {};
