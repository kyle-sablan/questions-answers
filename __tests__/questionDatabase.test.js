const supertest = require('supertest');
const app = require('../server/index.js');
const pool = require('../database/index.js');
const models = require('../server/Models/Questions.js');


const api = supertest(app);

// BEFORE EACH TEST / DROP EMPTY OUT QUESTIONS TABLE
// test for getting questions when product has no questions
// test for adding a question to a product
// test to retrieve question
// test to check helpfulness
// test to increment helpfulness and check if the count is increased
// test to check reports
// test to increment reports and check if the count is increased

beforeEach( async () => {
  await pool.query('DELETE FROM photos');
  await pool.query('DELETE FROM answers');
  await pool.query('DELETE FROM questions');
});

afterAll( (done) => {
  pool.end();
  done();
});

test('should return no results when questions table is empty', async () => {
  const response = await api.get('/qa/questions/1/');
  expect(response.body).toHaveLength(0);
});

test('should successfully add a question to the database', async () => {
  const questionToAdd = {
    product_id: 14,
    body: 'this is a test',
    name: 'ks',
    email: 'ks@net'
  };

  await api.post('/qa/questions').send(questionToAdd).expect(201);
});

test('should successfully deny adding a question to the database if its not proper format', async () => {
  const questionToAdd = {
    product_id: 14,
    body: 'this is a test'
  };
  await api.post('/qa/questions').send(questionToAdd).expect(400);
});

test('should successfully update question helpfulness', async () => {
  const questionToAdd = {
    product_id: 14,
    body: 'this is a test',
    name: 'ks',
    email: 'ks@net'
  };

  await api.post('/qa/questions').send(questionToAdd).expect(201);
  await api.put('/qa/questions/1/helpful').expect(204);
});

describe('able to retrieve added questions from database', () => {
  beforeEach( async () => {
    await pool.query('DELETE FROM questions');

    await pool.query(`
    INSERT INTO questions (product_id, questions_body, date_written, asker_name, asker_email)
    VALUES ($1, $2, $3, $4, $5)
    `, [14, 'this is a test', 1638157516, 'ks', 'ks@net'], (err) => {
      if (err) {
        console.log('ERROR INSTERTING USING QUERY METHOD');
      }
    });
    console.log('first insert done');

    const questionToAdd = {
      product_id: 14,
      body: 'this is a test',
      name: 'ks',
      email: 'ks@net'
    };

    console.log('before post');
    await api.post('/qa/questions').type('form').send(questionToAdd).set('Accept', 'application/json').expect(201);
    console.log('after post');
  });

  test('should successfully retrieve questions from database', async () => {
    const response = await api.get('/qa/questions/14/').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200);

    console.log(response);
    expect(response.body).toHaveLength(1);
  });
})