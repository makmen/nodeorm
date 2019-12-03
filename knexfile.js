// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        database : 'markers',
        password: 'root'
    }
  },

  staging: {
      client: 'mysql',
      connection: {
          host: 'localhost',
          user: 'root',
          database : 'markers',
          password: 'root'
      }
  },

  production: {
      client: 'mysql',
      connection: {
          host: 'localhost',
          user: 'root',
          database : 'markers',
          password: 'root'
      }
  }

};
