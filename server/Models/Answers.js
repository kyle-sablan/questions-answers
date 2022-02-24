const pool = require("../../database/index.js");

module.exports = {
  getAnswers: function ({ question_id }, { page, count }, callback) {
    page = Number(page);
    count = Number(count);
    if (isNaN(page) || page === 0) {
      page = 0;
    }
    if (isNaN(count) || count === 0) {
      count = 5;
    }

    // var queryStr = `
    //   SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpfulness, answers.reported,
    //     ARRAY_AGG ( JSON_BUILD_OBJECT ('id', photos.id, 'url', photos.url ) ) photo_urls
    //       FROM answers left join photos
    //       ON answers.question_id = $1 AND answers.id = photos.answer_id
    //       GROUP BY answers.id
    //       LIMIT $2
    //       OFFSET $3
    // `;

    // var queryStr = `
    //   SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpfulness, answers.reported,
    //     ARRAY_AGG ( JSON_BUILD_OBJECT ('id', photos.id, 'url', photos.url ) ) photo_urls
    //     FROM answers left join photos
    //     ON answers.question_id = $1 AND answers.id = photos.answer_id
    //     GROUP BY answers.id
    //     LIMIT $2
    //     OFFSET $3
    // `;

    var queryStr = `SELECT a.id, a.body, a.date_written, a.answerer_name, a.helpfulness, a.reported,
      COALESCE(photos.photo_urls, '[]') AS photo_urls
      FROM answers a JOIN LATERAL (
        SELECT JSON_AGG(JSON_BUILD_OBJECT('id', photos.id, 'url', photos.url)) AS photo_urls
        FROM photos
        WHERE photos.answer_id = a.id
      ) photos ON a.question_id = $1
      LIMIT $2
      OFFSET $3
    `;

    // answers get request still not returning all data. currently is returning values that shouldnt be there and all photos are empty arrays

    //     SELECT p.person_id, COALESCE(pet.pets, '[]') AS pets, p.person_name
    // FROM   person p
    // LEFT   JOIN LATERAL (
    //    SELECT json_agg(json_build_object('pet_id', pet.pet_id
    //                                    , 'pet_name', pet.pet_name)) AS pets
    //    FROM   pet
    //    WHERE  pet.owner_id = p.person_id
    //    ) pet ON true
    // ORDER  BY p.person_id
    // var queryStr = `
    //   SELECT id, body, date_written, answerer_name, helpfulness, reported
    //     FROM answers
    //     WHERE question_id = $1
    //     ORDER BY id
    //     LIMIT $2
    //     OFFSET $3
    // `;

    pool.query(queryStr, [question_id, count, page], (err, results) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        results.rows.forEach((answer) => {
          answer.date_written = new Date(answer.date_written * 1000);
        });
        const resultsObj = {
          question_id,
          page,
          count,
          results: results.rows,
        };
        callback(null, resultsObj);
      }
    });
  },

  addAnswer: function (
    { question_id },
    { answers_body, answerer_name, answerer_email },
    callback
  ) {
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

    var queryParams = [
      question_id,
      answers_body,
      time,
      answerer_name,
      answerer_email,
    ];
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
  },
};
