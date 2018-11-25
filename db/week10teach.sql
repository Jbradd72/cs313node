CREATE TABLE person (
    id SERIAL PRIMARY KEY NOT NULL,
    fName varchar(100) NOT NULL,
    lName varchar(100),
    birthdate date

);

CREATE TABLE offspring(
    parentId INTEGER REFERENCES person(id),
    childId INTEGER REFERENCES person(id)
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