module.exports = {
  test: {
    client: 'pg',
    version: '11',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'admin',
      database: 'finance'
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};