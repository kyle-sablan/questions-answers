const pool = require('../../database/index.js');

module.exports = {
  getAnswers: function (callback) {
    console.log('getting answers for a question');
    callback();
  },

  addAnswer: function (callback) {
    console.log('adding an answer for a question');
    callback();
  },

  markHelpful: function (callback) {
    console.log('marking an answer helpful');
    callback();
  },

  report: function (callback) {
    console.log('reporting an answer');
    callback();
  }
};
