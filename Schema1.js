const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/questions');

let questionsSchema = mongoose.schema({
  questions_id: Number,
  product_id: {
    type: Number,
    required: true
  },
  questions_body: {
    type: String,
    maxLength: 1000,
    required: true
  },
  questions_date: Date,
  asker_name: {
    type: String,
    maxLength: 60,
    required: true
  },
  asker_email: {
    type: String,
    maxLength: 60,
    required: true
  },
  questions_helpfulness: {
    type: Number,
    min: 0
  },
  reported: Boolean,
  answers: [
    {
      answer_id: Number,
      body: {
        type: String,
        maxLength: 1000,
        required: true
      },
      date: Date,
      answerer_name: {
        type: String,
        maxLength: 60,
        required: true
      },
      answerer_email: {
        type: String,
        maxLength: 60,
        required: true
      },
      helpfulness: {
        type: Number,
        min: 0
      },
      reported: Boolean,
      photos: [
        {
          url: String
        }
      ]
    }
  ]
});