import Ember from 'ember';
import TH from './factory-guy';

Ember.Test.registerHelper('login', function(app, user) {
  var currentUser = (!user || user === null) ? TH.make("user") : user;
  authenticateSession();
  currentSession().set("currentUser", currentUser);
});

export default {};