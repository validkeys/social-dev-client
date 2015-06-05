import Ember from 'ember';
import registerAcceptanceTestHelpers from './201-created/register-acceptance-test-helpers';

import initializeTestHelpers from 'simple-auth-testing/test-helpers';
initializeTestHelpers();

import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';

import login from 'client/tests/helpers/login';
import queryString from 'client/tests/helpers/query-string';
import responsiveMedia from 'client/tests/helpers/responsive-media';

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    registerAcceptanceTestHelpers();
    application.injectTestHelpers();
  });

  return application;
}
