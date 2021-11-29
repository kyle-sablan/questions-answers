module.exports = {
  // GET /qa/questions/:question_id/answers/:page/:count
  GET_ANSWERS: function(req, res) {
    console.log(req.params);
    res.send(`Hello from get answers for question id: ${req.params.question_id}`);
  },

  // POST /qa/questions/:question_id
  POST_ANSWER: function(req, res) {
    res.send('Hello from add answer');
  },

  // PUT /qa/answers/:answer_id/helpful
  PUT_HELPFUL: function(req, res) {
    res.send('marking answer helpful');
  },

  // PUT /qa/answers/:answer_id/report
  PUT_REPORT: function(req, res) {
    res.send('reporting answer');
  }
};