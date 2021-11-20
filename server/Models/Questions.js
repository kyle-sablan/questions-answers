const pool = require('../../database/index.js');

module.exports = {
  readQuestions: function(queryParams, callback) {
    pool.query('SELECT * FROM questions WHERE product_id = $1', [queryParams.id], (err, results) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log(results.rows);
        callback(null, results.rows);
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