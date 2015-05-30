process.env.NODE_ENV = process.env.NODE_ENV || "test";

import Lab from 'lab';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import _ from 'lodash';

Chai.use(ChaiAsPromised);

global.Lab = Lab;
global.Chai = Chai;

global.assert = Chai.assert;
global.expect = Chai.expect;
global.should = Chai.should();

global.sinon  = sinon;
global._      = _;

// let lab = Lab.script();
// global.lab         = lab;
// global.beforeEach  = lab.beforeEach;
// global.before      = lab.before;
// global.after       = lab.after;
// global.afterEach   = lab.afterEach;
// global.test        = lab.test;


export { default as BaseFactory } from './factory';
export { startDatabase, stopDatabase } from '../support/initializers/database';
export { startServer } from '../support/initializers/server';