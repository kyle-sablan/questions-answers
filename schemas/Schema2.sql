CREATE DATABASE questions_and_answers;
USE questions_and_answers;

CREATE TABLE questions (
  id INT GENERATED AS IDENTITY,
  product_id INT REQUIRED,
  questions_body TEXT NOT NULL,
  question_date DATE REQUIRED,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  questions_helpfulness INT DEFAULT 0,
  reported BOOLEAN,
  PRIMARY KEY id
);

--timestamp data type
--answer_id is the id corresponding the the specific question
--id is the unqiue id for a given answer
CREATE TABLE answers (
  id INT GENERATED AS IDENTITY,
  question_id INT,
  body TEXT NOT NULL,
  answer_date DATE REQUIRED,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  helpfulness INT DEFAULT 0,
  reported BOOLEAN,
  --OR make a photos array in table
  --photos text[]
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);


--remove if using photos array in answers table
CREATE TABLE photos (
  id INT GENERATED AS IDENTITY,
  answer_id INT,
  photo_url URL REQUIRED,
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id) REFERENCES answers(photos_id)
);