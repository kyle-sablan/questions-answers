const { Pool } = require('pg');

const pool = new Pool({
  database: 'questions_and_answers'
});

module.exports = pool;