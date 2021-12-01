const pool = require('../../database/index.js');

module.exports = {
  readQuestions: function({ id }, { page, count }, callback) {
    id = Number(id);
    page = Number(page);
    count = Number(count);
    if (isNaN(page) || page === 0) {
      page = 1;
    }
    if (isNaN(count) || count === 0) {
      count = 5;
    }
    pool.query('SELECT * FROM questions WHERE product_id = $1 ORDER BY id LIMIT $2 OFFSET $3', [id, count, page], (err, results) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        results.rows.forEach((question) => {
          question.date_written = new Date(question.date_written * 1000);
        });
        callback(null, results.rows);
      }
    });
  },

  addQuestion: function({ product_id, body, name, email }, callback) {
    let time = Date.now();
    pool.query(`
      INSERT INTO questions (product_id, questions_body, date_written, asker_name, asker_email)
      VALUES ($1, $2, $3, $4, $5)
      `, [product_id, body, time, name, email],
      (err) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null);
        }
      });
  },

  markHelpful: function({ question_id }, callback) {
    pool.query(`UPDATE questions SET questions_helpfulness = questions_helpfulness + 1 WHERE id = $1`,
      [question_id],
      (err) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null);
        }
      });
  },

  report: function({ question_id }, callback) {
    pool.query(`UPDATE questions SET reported = reported + 1 WHERE id = $1`,
      [question_id],
      (err) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null);
        }
      });
  }
}


// Promise Code
//  pool
//   .connect()
//   .then((client) => {
//     return client
//       .query('SELECT * FROM questions WHERE product_id = $1 LIMIT 5', [queryParams.id])
//       .then((response) => {
//         client.release();
//         console.log(response);
//         callback(null, response.rows())
//       })
//       .catch((err) => {
//         client.release();
//         console.log(err.stack);
//         callback(err, null);
//       });
//   });