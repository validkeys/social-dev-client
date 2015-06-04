import Ember from 'ember';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import FactoryGuy from 'ember-data-factory-guy';

var helper = Ember.Object.create({

  // TestHelper: Ember.Object.createWithMixins(FactoryGuyTestMixin),

  testHelper: null,
  store:      null,
  make:       null,
  makeList:   null,
  build:       null,
  buildList:   null,
  apiNamespace: null,

  setup: function(app) {
    this.testHelper = TestHelper.setup(app);
    this.store = TestHelper.getStore();
    this.make = function() { return FactoryGuy.make.apply(FactoryGuy,arguments); };
    this.makeList = function() { return FactoryGuy.makeList.apply(FactoryGuy,arguments); };
    this.build = function() { return FactoryGuy.build.apply(FactoryGuy,arguments); };
    this.buildList = function() { return FactoryGuy.buildList.apply(FactoryGuy,arguments); };
    this.apiNamespace = this.store.adapterFor('application').get('namespace');
    return;
  },

  teardown: function() {
    var _this = this;
    Ember.run(function(){ TestHelper.teardown(); });
  }
});


export default helper;