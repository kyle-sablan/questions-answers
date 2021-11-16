CREATE DATABASE qanda;
USE qanda;

CREATE TABLE questions (
  question_id INT GENERATED AS IDENTITY,
  product_id INT REQUIRED,
  questions_body VARCHAR(1000) NOT NULL,
  question_date DATE REQUIRED,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  questions_helpfulness INT DEFAULT 0,
  reported BOOLEAN,
  PRIMARY KEY question_id
);

--answer_id is the id corresponding the the specific question
--id is the unqiue id for a given answer
CREATE TABLE answers (
  answer_id INT GENERATED AS IDENTITY,
  question_answered INT,
  body VARCHAR(1000) NOT NULL,
  answer_date DATE REQUIRED,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  helpfulness INT DEFAULT 0,
  reported BOOLEAN,
  photos_id INT,
  --OR make a photos array in table
  --photos text[]
  PRIMARY KEY (answer_id),
  FOREIGN KEY (question_answered) REFERENCES questions(question_id)
);


--remove if using photos array in answers table
CREATE TABLE photos (
  photo_id INT GENERATED AS IDENTITY,
  photo_for_answer INT,
  photo_url URL REQUIRED,
  PRIMARY KEY (photo_id),
  FOREIGN KEY (photo_for_answer) REFERENCES answers(photos_id)
);