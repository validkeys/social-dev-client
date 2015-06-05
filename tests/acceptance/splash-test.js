import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'client/tests/helpers/start-app';
import TH from 'client/tests/helpers/factory-guy';

var application;

module('Acceptance | splash', {
  beforeEach: function() {
    application = startApp();
    TH.setup(application);
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    TH.teardown(application);
  }
});

test('visiting /splash', function(assert) {
  visit('/splash');

  andThen(function() {
    assert.equal(currentPath(), 'splash');
  });
});