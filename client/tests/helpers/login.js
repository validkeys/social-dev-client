import Ember from 'ember';
import FactoryGuy from 'ember-data-factory-guy';

Ember.Test.registerHelper('login', function(app, user) {
  var currentUser = (!user || user === null) ? FactoryGuy.make("user") : user;
  authenticateSession();
  currentSession().set("currentUser", currentUser);
});

Ember.Test.registerHelper('mockLoginSuccess', (app) => {

  let jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxfSwiZXhwIjoxNTE0ODE0MjkyfQ.JMhalDhHPnJKlrP4UQ_mVO03Xel1qV2Ixz1IhiFXP2g";

  Ember.$.mockjax({
    url: "/sessions/token",
    status: 200,
    responseText: {
      id:   1,
      token:  jwt
    }
  });
});

export default {};