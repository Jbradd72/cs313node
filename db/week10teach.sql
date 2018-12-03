CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    username varchar(100) NOT NULL,
    password varchar(50) NOT NULL

);

CREATE TABLE picks(
    id SERIAL PRIMARY KEY NOT NULL,
    userid int NOT NULL,
    week int NOT NULL,
    picks varchar(464)

);

INSERT INTO person( id, fname, lname) VALUES (1, 'Mom', '1');
INSERT INTO person( id, fname, lname) VALUES (2, 'Dad', '1');
INSERT INTO person( id, fname, lname) VALUES (3, 'Mom', '2');
INSERT INTO person( id, fname, lname) VALUES (4, 'Dad', '2');
INSERT INTO person( id, fname, lname) VALUES (5, 'Child', '1');
INSERT INTO person( id, fname, lname) VALUES (6, 'Child', '2');


INSERT INTO offspring(parentId, childId) VALUES (1,5);
INSERT INTO offspring(parentId, childId) VALUES (2,5);
INSERT INTO offspring(parentId, childId) VALUES (3,6);
INSERT INTO offspring(parentId, childId) VALUES (4,6);