const pool = require('../../database/index.js');

module.exports = {
  getAnswers: function ({ question_id }, callback) {
    // var queryStr = `
    //   SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpfulness, answers.reported,
    //     ARRAY_AGG ( JSON_BUILD_OBJECT ('id', photos.id, 'url', photos.url ) ) photo_urls
    //       FROM answers INNER JOIN photos
    //       ON answers.question_id = $1 AND answers.id = photos.answer_id
    //       GROUP BY answers.id
    // `;

    var queryStr = `
      SELECT id, body, date_written, answerer_name, helpfulness, reported
        FROM answers
        WHERE question_id = $1
    `

    pool.query(queryStr, [question_id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        results.rows.forEach((answer) => {
          answer.date_written = new Date(answer.date_written * 1000);
        });
        const resultsObj = {
          question_id: question_id,
          results: results.rows
        };
        callback(null, resultsObj);
      }
    });
  },

  addAnswer: function ({ question_id }, { answers_body, answerer_name, answerer_email }, callback) {
    var time = Date.now();
    var queryStr = `
        INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email)
        VALUES ($1, $2, $3, $4, $5)
    `;

    // var queryStr = `
    //   WITH new_answer AS (
    //     INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email)
    //     VALUES ($1, $2, $3, $4, $5)
    //     RETURNING id
    //   )
    //   INSTERT INTO photos (answer_id, url)
    //   VALUES $6
    // `;

    var queryParams = [question_id, answers_body, time, answerer_name, answerer_email];
    console.log(queryParams);
    pool.query(queryStr, queryParams, (err) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null);
      }
    });
  },

  markHelpful: function ({ answer_id }, callback) {
    var queryStr = `
      UPDATE answers SET helpfulness = helpfulness + 1 WHERE id = $1
    `;

    pool.query(queryStr, [answer_id], (err) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null);
      }
    });
  },

  report: function ({ answer_id }, callback) {
    var queryStr = `
      UPDATE answers SET reported = reported + 1 WHERE id = $1
    `;

    pool.query(queryStr, [answer_id], (err) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null);
      }
    });
  }
};
