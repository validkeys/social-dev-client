var Controller    = require('./controller'),
    Joi           = require('joi'),
    PolicyService = global.reqlib('/src/app/services/policies');

var index = function(server, next) {

  // Load Policies
  server.plugins.mrhorse.loadPolicies(server, {
    policyDirectory: require('path').join(__dirname, "/policies"),
    defaultApplyPoint: 'onPreHandler'
  } , function(err) {
        
    if (err) { 
      console.log("ERROR", err);
      return next(err);
    }

    var root = "/users";

    // Routes

    server.route([

      // POST ROUTE

      {
        method:   "POST",
        path:     root,
        config:   {
          handler:      Controller.create,
          bind:         Controller,
          description:  "Create a new user.",
          notes:        "Must pass first, last, email and password",
          validate:     {
            payload: {
              firstName: Joi.string().required(),
              lastName:  Joi.string().required(),
              email:     Joi.string().email().required(),
              password:  Joi.string().min(4).required(),
              username:  Joi.string().min(4).required()
            }
          }
        }
      },

      // GET ROUTE

      {
        method: "GET",
        path:   root + "/{user_id}",
        config: {
          handler:  Controller.show,
          bind:     Controller
        }
      },

      // PUT ROUTE

      {
        method:   "PUT",
        path:     root + "/{user_id}",
        config:   {
          handler:  Controller.update,
          bind:     Controller,
          auth:   'token',
          plugins: {
            policies: PolicyService.withDefaults(server, ['checkForPasswordChange'])
          }
        }
      }

      
    ]);

    next();
  });
}

exports.register = function(server, options, next) {
  server.after(index, 'mrhorse');
  next();
};

exports.register.attributes = { pkg: require('./package') };