const model = require('../Models/Answers.js');

module.exports = {
  // GET /qa/questions/:question_id/answers/:page/:count
  GET_ANSWERS: function(req, res) {
    console.log(req.params);
    console.log(req.query);

    model.getAnswers(() => {
      res.status(200).send('GET Route set up correctly');
    });
  },

  // POST /qa/questions/:question_id
  POST_ANSWER: function(req, res) {
    model.addAnswer(() => {
      res.status(200).send('POST Route set up correctly');
    });
  },

  // PUT /qa/answers/:answer_id/helpful
  PUT_HELPFUL: function(req, res) {
    model.markHelpful(() => {
      res.status(200).send('PUT HELPFUL Route set up correctly');
    });
  },

  // PUT /qa/answers/:answer_id/report
  PUT_REPORT: function(req, res) {
    model.report(() => {
      res.status(200).send('PUT REPORT Route set up correctly');
    });
  }
};