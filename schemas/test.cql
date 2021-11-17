CREATE TABLE questions (
  question_id integer,
  product_id integer,
  questions_body text,
  question_date date,
  asker_name text,
  questions_helpfulness integer,
  reported boolean,
  answers_id integer, --all answers for this question will have this field
  PRIMARY KEY ((product_id), question_date)
);

--answer_id is the id corresponding the the specific question
--id is the unqiue id for a given answer
CREATE TABLE answers (
  id integer,
  answer_id integer,
  body text,
  answer_date date,
  answerer_name text,
  helpfulness integer,
  photos_id FOREIGN KEY,
  PRIMARY KEY ((answer_id), answer_date)
);

CREATE TABLE photos (
  id integer,
  photo_id integer,
  photo_url text,
  PRIMARY KEY ((photo_id))
);
