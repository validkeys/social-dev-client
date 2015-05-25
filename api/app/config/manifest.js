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
          policies: ['check-for-jwt','fetch-object']
        }
      }
    }
  ],
  plugins: {
    "./initializers/database":  null,
    "./models/user":            null,
    "./pods/sessions":          null,
    "./pods/users":             null,
    "good":                     require('./good'),
    "mrhorse":                  require('./mrhorse')
  }
}