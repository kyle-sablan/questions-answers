//question routes to set up
//get questions for a product
//add a question for a product
//mark a question as helpful
//report a question
module.exports = {
  // GET /qa/questions
  getQuestions: function(req, res) {
    res.send('Hello from get questions');
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
