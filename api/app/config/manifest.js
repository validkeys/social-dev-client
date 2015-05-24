module.exports = {
  connections: [
    {
      host:   'localhost',
      port:   3000,
      labels: ['api']
    }
  ],
  plugins: {
    "./sessions": null,
    "good":       require('./good')
  }
}