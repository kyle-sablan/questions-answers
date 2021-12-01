const model = require('../Models/Answers.js');

module.exports = {
  // GET /qa/questions/:question_id/answers
  GET_ANSWERS: function(req, res) {
    console.log(req.params);
    console.log(req.query);

    model.getAnswers(req.params, (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).send('Error retrieving answers');
      } else {
        res.status(200).json(results);
      }
    });
  },

  // POST /qa/questions/:question_id
  POST_ANSWER: function(req, res) {
    console.log(req.body);
    model.addAnswer(req.params, req.body, (err) => {
      if (err) {
        console.log(err);
        res.status(400).send('Error adding answer');
      } else {
        res.status(201).send('successfully added answer');
      }
    });
  },

  // PUT /qa/answers/:answer_id/helpful
  PUT_HELPFUL: function(req, res) {
    model.markHelpful(req.params, (err) => {
      if (err) {
        res.status(400).send('Error marking answer as helpful');
      } else {
        res.status(204).send('answer marked as helpful!');
      }
    });
  },

  // PUT /qa/answers/:answer_id/report
  PUT_REPORT: function(req, res) {
    model.report(req.params, (err) => {
      if (err) {
        res.status(400).send('Error reporting answer');
      } else {
        res.status(204).send('reported answer!');
      }
    });
  }
};