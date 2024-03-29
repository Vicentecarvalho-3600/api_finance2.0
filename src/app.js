const app = require('express')();
const consign = require('consign');
const knex = require('knex');
const knexfile = require('../knexfile');

// TODO criar chavemento dinamico.
app.db = knex(knexfile.test);



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


app.use((err, req, res, next) => {
  const {name, message, stack} = err;
  if ( name === 'ValidationError') res.status(400).json({error: message});
  else res.status(500).json({name, message, stack});
  next();
})

// TODO crindo um log manualmente.
// app.db.on('query', (query) => {
//   console.log({ sql: query.sql, bindings: query.bindings ? query.bindings.join(',') : '' });
// })
//   .on('query-response', response => console.log(response))
//   .on('error', error => console.log(error))


module.exports = app;
