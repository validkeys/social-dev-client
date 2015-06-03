import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('auth', { path: '/auth' }, function() {
    this.route('login', { path: '/login' });
    this.route('signup', { path: '/signup' });
  });
});

export default Router;
