const bodyParser = require('body-parser');
// const knexLogger = require('knex-logger'); // TODO carregar knex-logger.


module.exports = (app)  => {
  app.use(bodyParser.json());
  // app.use(knexLogger(app.db)); // TODO usando knex-logger no projeto.
}
