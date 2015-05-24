module.exports = {
  connections: [
    {
      host:   'localhost',
      port:   3000,
      labels: ['api'],
      routes: {
        cors: {
          origin: ['*']
        }
      }
    }
  ],
  plugins: {
    "./initializers/database":  null,
    "./pods/sessions":          null,
    "good":                     require('./good')
  }
}