\COPY questions FROM './SDC_Data/questions.csv' WITH DELIMITER ',' CSV HEADER;

\COPY answers FROM './SDC_Data/answers.csv' WITH DELIMITER ',' CSV HEADER;

\COPY photos FROM './SDC_Data/answers_photos.csv' WITH DELIMITER ',' CSV HEADER;
