var Controller = require('./controller');
exports.register = function(server, options, next) {

  server.route([
    {
      method:   "GET",
      path:     "/",
      handler:  Controller.index
    }
  ]);

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};