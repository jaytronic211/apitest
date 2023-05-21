const mysql = require('mysql2/promise');
require('dotenv').config();

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);
  connection.end();
  return results;
}

const config = {
  db: {host: process.env.HOST, user: process.env.USER, password: process.env.PASSWORD, database: process.env.DATABASE}
};

module.exports = {
  query
}
