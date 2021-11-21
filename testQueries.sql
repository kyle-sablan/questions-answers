

\timing

-- SELECT * FROM questions
--   WHERE product_id = 2;

-- 1637431219978

-- INSERT INTO questions(product_id, questions_body, date_written, asker_name, asker_email)
--   VALUES (2, 'this is a test to see whats going on???', 1637431219978, 'ks', 'laks@sladk.com')
--   RETURNING id;

-- USE SINGLE QUOTES FOR STRINGS / TEXT
SELECT * FROM questions
  WHERE asker_name = 'ks';


-- SELECT MAX(id) FROM questions;

-- Select nextval(pg_get_serial_sequence('questions', 'id')) as new_id;

-- SELECT nextval(new_id, (SELECT MAX(id) FROM questions) + 1);

-- RESETS THE ID PRIMARY KEY COUNTER
-- SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'id'), MAX(id)) FROM questions;