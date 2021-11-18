DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;


CREATE TABLE questions (
  id INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  product_id INT,
  questions_body TEXT NOT NULL,
  date_written TIMESTAMPTZ,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  questions_helpfulness INT DEFAULT 0,
  reported BOOLEAN
);

CREATE TABLE answers (
  id INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  question_id INT REFERENCES questions (id),
  body TEXT NOT NULL,
  date_written TIMESTAMPTZ,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  helpfulness INT DEFAULT 0,
  reported BOOLEAN
);


CREATE TABLE photos (
  id INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  answer_id INT REFERENCES answers (id),
  url TEXT
);