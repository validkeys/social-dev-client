import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // AUTH
  this.route('login',   { path: '/login' });
  this.route('signup',  { path: '/signup' });
  this.route('splash',  { path: '/splash' });

  // Index Route will be the user's feed
  // If they aren't logged in, take them to "splash" -> an logged out homepage

});

export default Router;
