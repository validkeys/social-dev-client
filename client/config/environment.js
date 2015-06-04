/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'client',
    // podModulePrefix: '/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['simple-auth'] = {
    authorizer:               'simple-auth-authorizer:token',
    store:                    'simple-auth-session-store:local-storage',
    session:                  'session:custom',
    routeAfterAuthentication: 'index',
    authenticationRoute:      '/splash'
  }

  ENV['simple-auth-token'] = {
    authorizer:               'simple-auth-authorizer:token',
    serverTokenEndpoint:      '/sessions/token',
    identificationField:      'email',
    passwordField:            'password',
    tokenPropertyName:        'token',
    authorizationPrefix:      'Bearer ',
    authorizationHeaderName:  'Authorization',
    headers: {},
    // JWT specific vv
    refreshAccessTokens:        true,
    serverTokenRefreshEndpoint: '/sessions/token_refresh/',
    tokenExpireName:            'exp',
    timeFactor:                 1  // example - set to "1000" to convert incoming seconds to milliseconds.
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV['simple-auth']['store'] = "simple-auth-session-store:ephemeral";
  }

  if (environment === 'production') {

  }

  return ENV;
};
