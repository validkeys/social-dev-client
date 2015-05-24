module.exports = {
  reporters: [{
    reporter: require('good-console'),
    events: {
      response: '*',
      log:      '*',
      error:    '*',
      response: '*'
    }
  }]
};