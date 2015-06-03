import Ember from 'ember';
import DS from 'ember-data';
import Session from 'simple-auth/session';

let initialize = function(container, application) {
  var CustomSession = Session.extend({
    storeService: Ember.inject.service('store'),
    currentUser:  Ember.computed('secure.token', function () {
      var userId = this.get('secure.id');
      if (!Ember.isEmpty(userId)) {
        return DS.PromiseObject.create({
          promise: this.get('storeService').find('user', userId)
        });
      }
    })
  });
  application.register('session:custom', CustomSession);
};

export default {
  name:       'session',
  after:      'ember-data',
  initialize: initialize
};