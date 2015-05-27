var jwt     = require('jsonwebtoken');
var secret  = process.env.JWTSECRET || "3b9d5e09792872ca3eeb73fdc392c8f62a7d7e4ca00baca0e4f249501f8feaa6b28570cd27e45cb0fc5b8b0cfae1fc96e21b47cb549cb2cc35e6e1b2864db824";
var signOptions   = {};
var verifyOptions = {};

exports.secret = secret;

exports.sign = function(data) {
  return jwt.sign(data, secret, signOptions);
};

exports.verify = function(token) {
  return jwt.verify(token, secret, verifyOptions);
};