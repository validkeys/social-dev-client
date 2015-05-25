var Controller = require('./controller'),
    Joi        = require('joi');

exports.register = function(server, options, next) {

  var root = "/users";

  server.route([
    {
      method:   "POST",
      path:     root,
      config:   {
        handler:      Controller.create.bind(Controller),
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

    {
      method: "GET",
      path:   root + "/{user_id}",
      config: {
        handler: Controller.show.bind(Controller)
      }
    },

    {
      method:   "PUT",
      path:     root + "/{user_id}",
      config:   {
        handler: Controller.update.bind(Controller)
      }
    }
  ]);

  next();
};

exports.register.attributes = { pkg: require('./package') };