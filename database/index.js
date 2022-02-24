require("dotenv").config();
const { Pool } = require("pg");

// const pool = new Pool({
//   host: process.env.HOST,
//   port: 5432,
//   user: 'api_user',
//   password: process.env.PASSWORD,
//   database: 'questions_and_answers'
//   // ssl: 1
// });

const pool = new Pool({
  host: process.env.HOST,
  port: 5432,
  database: "questions_and_answers",
  // ssl: 1
});

module.exports = pool;
