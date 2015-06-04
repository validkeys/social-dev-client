import Controller from './controller';
import Joi from 'joi';
import * as PolicyService from '../../services/policies';

let index = (server, next) => {

  server.route([]);

};

let register = (server, options, next) => {
  server.after(index, 'mrhorse');
  next();
};

register.attributes = { pkg: require('./package') };

export { register };