const app = require('express')();
const consign = require('consign');
const knex = require('knex');
const knexfile = require('../knexfile');
// const knexLogger = require('knex-logger'); // TODO carregar knex-logger.

// TODO criar chavemento dinamico.
app.db = knex(knexfile.test);


// TODO usando knex-logger no projeto.
// app.use(knexLogger(app.db));

// TODO consign usado para carregar middlewares cwd: -> selecionar diretorio raiz verbose: -> nao parecer so carregamentod no terminal
consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./services')
  
  .then('./routes')
  .then('./config/routes.js')
  .into(app);


app.get('/', (req, res) => {

  res.status(200).send();
});


// TODO crindo um log manualmente.
// app.db.on('query', (query) => {
//   console.log({ sql: query.sql, bindings: query.bindings ? query.bindings.join(',') : '' });
// })
//   .on('query-response', response => console.log(response))
//   .on('error', error => console.log(error))


module.exports = app;
