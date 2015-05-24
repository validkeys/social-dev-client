var Hapi      = require('hapi'),
    Glue      = require('glue'),
    Path      = require('path'),
    AppConfig = require('./app/config');

var glueOptions = {
  relativeTo: Path.join(__dirname, "/app")
};

Glue.compose(AppConfig.manifest, glueOptions, function(err, server) {

  if (err) {
    console.log(err);
    process.exit(1);
  }

  server.start(function() {
    console.log("Hapi server started at: " + server.info.uri + " on port " + server.info.port);
  });
});