import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'client/tests/helpers/start-app';
import TH from 'client/tests/helpers/factory-guy';

var application;

module('Acceptance | index', {
  beforeEach: function() {
    application = startApp();
    TH.setup(application);
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    TH.teardown(application);
  }
});

test('If im not logged in, i should be redirected to the splash page', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentPath(), 'splash');
  });
});

test('if I am logged in I should remain', function(assert) {
  login();

  visit('/');

  andThen(function() {
    assert.equal(currentPath(), "index");
  });
});