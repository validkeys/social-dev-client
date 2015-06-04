import Glue from 'glue';
import * as AppConfig from '../../../src/app/config';
import AppRoot from 'app-root-path';

let server;

let glueOptions = {
  relativeTo: AppRoot.resolve('/src/app')
};

let startServer = function(next) {
  Glue.compose(AppConfig.manifest, glueOptions, function(err, serverInstance) {
    if (err){ console.log("Glue Error!", err); return next(err); }
    server = serverInstance;
    server.start(function(err) {
      next(server);
    });
  });
};

let stopServer = function(instance, cb) {
  if (instance && instance.stop) {
    instance.stop({}, function() {
      cb();
    });
  } else {
    console.log("no instance to stop");
    cb();
  }
};

export { startServer, stopServer };