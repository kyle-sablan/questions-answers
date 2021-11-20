const model = require('../Models/Questions.js');

module.exports = {
  // GET /qa/questions
  getQuestions: function(req, res) {
    console.log(req.params);
    model.readQuestions(req.params, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send('Error getting data');
      } else {
        res.status(200).json(results);
      }
    });
  },

  // POST /qa/questions
  addQuestion: function(req, res) {
    res.send('Hello from add question');
  },

  // PUT /qa/questions/:question_id/helpful
  markHelpful: function(req, res) {
    res.send('marking helpful');
  },

  // PUT /qa/questions/:question_id/report
  report: function(req, res) {
    res.send('reporting');
  }
};
