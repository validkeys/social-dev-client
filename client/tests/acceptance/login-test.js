import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'client/tests/helpers/start-app';
import TH from 'client/tests/helpers/factory-guy';

var application;

module('Acceptance | login', {
  beforeEach: function() {
    application = startApp();
    TH.setup(application);
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    TH.teardown(application);
  }
});

test('visiting /login', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});
