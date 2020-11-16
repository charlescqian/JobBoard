use jobdb;

INSERT INTO Application
VALUES('2007-05-08 12:35:29.123', 18282);

INSERT INTO Company
VALUES(10034,'google', "dont be evil");

INSERT INTO Employer
VALUES(18324, 'mzuckerberg@facebook.com', 'badopsec', 'mark zuckerberg', NULL);
REPLACE INTO Employer
VALUES(18324, 'mzuckerberg@facebook.com', 'badopsec', 'mark zuckerberg', 10034);

INSERT INTO E1 
VALUES('this job sucks', 18324, 'engineering');
