module.exports = {
  connections: [
    {
      host:   'localhost',
      port:   3000,
      labels: ['api'],
      routes: {
        cors: {
          origin: ['*']
        },
        plugins: {
          policies: ['fetch-object']
        }
      }
    }
  ],
  plugins: {
    "good":                     require('./good'),
    "mrhorse":                  require('./mrhorse'),
    "hapi-auth-jwt":            null,
    "./initializers/database":  null,
    './initializers/authentication': null,
    "./models/user":            null,
    "./pods/sessions":          null,
    "./pods/users":             null
  }
}