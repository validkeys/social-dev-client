reqlib      = require('app-root-path').require;
Factory     = require('./factory');
Lab         = require('lab');
Code        = require('code');
Glue        = require('glue');
AppConfig   = reqlib('/app/config');

process.env.NODE_ENV = process.env.NODE_ENV || "test";
global.reqlib   = require('app-root-path').require;