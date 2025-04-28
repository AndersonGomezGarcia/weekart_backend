const pgp = requirte('pg-promise')();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'weekart-db',
  user: 'postgres',
  password: '718293'
});

module.exports = db;
// This code establishes a connection to a PostgreSQL database using the pg-promise library.