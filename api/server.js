var Hapi      = require('hapi'),
    Glue      = require('glue'),
    Path      = require('path'),
    AppConfig = require('./app/config');

var glueOptions = {
  relativeTo: Path.join(__dirname, "/app/pods")
};

Glue.compose(AppConfig.manifest, glueOptions, function(err, server) {
  server.start(function() {
    console.log("Hapi server started at: " + server.info.uri + " on port " + server.info.port);
  });
});