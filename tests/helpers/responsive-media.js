import Ember from 'ember';

Ember.Test.registerHelper('smartphone', function(app) {
  Ember.run(function() {
    return app.__container__.lookup("testing:responsive").activate('isSmartphone');
  });
});

Ember.Test.registerHelper('mobile', function(app) {
  Ember.run(function() {
    return app.__container__.lookup("testing:responsive").activate('isMobile');
  });
});

Ember.Test.registerHelper('desktop', function(app) {
  Ember.run(function() {
    return app.__container__.lookup("testing:responsive").activate('isDesktop');
  });
});

Ember.Test.registerHelper('tablet', function(app) {
  Ember.run(function() {
    return app.__container__.lookup("testing:responsive").activate('isDesktop');
  });
});

Ember.Test.registerHelper('jumbo', function(app) {
  Ember.run(function() {
    return app.__container__.lookup("testing:responsive").activate('isDesktop');
  });
});

export default {};