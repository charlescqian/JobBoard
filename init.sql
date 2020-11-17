DROP DATABASE IF EXISTS jobdb;
CREATE DATABASE jobdb;
use jobdb;

CREATE TABLE Application(timeApplied DATETIME(6),
			applicationID int,
			fileName VARCHAR(255),
			PRIMARY KEY(applicationID));

CREATE TABLE Jobseeker(jobseekerID int,
			 	email VARCHAR(50) NOT NULL,
			  	password VARCHAR(20) NOT NULL,
			  	name VARCHAR(50) NOT NULL,
				PRIMARY KEY(jobseekerID),
				UNIQUE(email));


CREATE TABLE Company( companyID int,
			  companyName VARCHAR(50),
			  companyDescription TEXT,
			  PRIMARY KEY (companyID));



CREATE TABLE Employer(employerID int,
					email VARCHAR(50) NOT NULL,
					password VARCHAR(20) NOT NULL,
					name VARCHAR(20) NOT NULL,
					cID int,
					UNIQUE(email),
					PRIMARY KEY(employerID),
					FOREIGN KEY(cID) REFERENCES Company(companyID)
					ON DELETE NO ACTION ON UPDATE CASCADE);	

CREATE TABLE E1(jobDescription VARCHAR(255),
					eID int,
					department VARCHAR(50),
					PRIMARY KEY(jobDescription),
					FOREIGN KEY (eID) REFERENCES Employer(employerID)
					ON DELETE CASCADE);

 CREATE TABLE Job(jobtype VARCHAR(20),
		       		industryType VARCHAR(20),
                    salary DECIMAL(19,2),
                    jobID int,
                    jobTitle VARCHAR(80), 
		   			eID int NOT NULL,
		    		PRIMARY KEY(jobID), 
		    		FOREIGN KEY(eID) REFERENCES Employer(employerID)
		      		ON DELETE NO ACTION);

CREATE TABLE J1(jobAddress VARCHAR(50),
		        industryType VARCHAR(20),
				companyName VARCHAR(50),
            	jID int,
		        PRIMARY KEY(jobAddress, industryType),
        		FOREIGN KEY(jID) REFERENCES Job(jobID)
        		ON DELETE CASCADE);

CREATE TABLE Posting(postingID int,
				timePosted DATETIME(6), 
				jobID int NOT NULL,
				status VARCHAR(20),
				PRIMARY KEY(postingID),
				FOREIGN KEY(jobID) REFERENCES Job(jobID)
				ON DELETE NO ACTION);
                

CREATE TABLE Interview(interviewID int,
				interviewLocation VARCHAR(100),
				interviewDateTime DATETIME(6),
				aID int NOT NULL,
				PRIMARY KEY(interviewID),	
				UNIQUE (interviewLocation, interviewDateTime),
				FOREIGN KEY (aID) REFERENCES Application(applicationID)
ON DELETE CASCADE);



CREATE TABLE Apply(pID  int NOT NULL,
				jID int NOT NULL,
				aID int NOT NULL,
				PRIMARY KEY(aID, jID),
				UNIQUE(aID, pID),
				FOREIGN KEY(pID) REFERENCES Posting(postingID)
				ON DELETE CASCADE ON UPDATE CASCADE,
				FOREIGN KEY(jID) REFERENCES Jobseeker(jobseekerID)
				ON DELETE CASCADE ON UPDATE CASCADE,
				FOREIGN KEY(aID) REFERENCES Application(applicationID)
				ON DELETE CASCADE ON UPDATE CASCADE);
			
CREATE TABLE Offer(offerTime DateTime(6),
				offerID int,
				aID int NOT NULL,
				jID int NOT NULL,
				PRIMARY KEY(offerID),
				FOREIGN KEY(aID) REFERENCES Application(applicationID)
				ON DELETE CASCADE ON UPDATE CASCADE,
				FOREIGN KEY(jID) REFERENCES Jobseeker(jobseekerID)
				ON DELETE CASCADE ON UPDATE CASCADE);
					
		   

CREATE TABLE Resume(fileName VARCHAR(100),
			uploadTime TIMESTAMP,
			applicationID int,
			jID int,
			PRIMARY KEY(fileName, jID),
			FOREIGN KEY(jID) REFERENCES Jobseeker(jobseekerID)
			ON DELETE CASCADE ON UPDATE CASCADE);
			
		           
CREATE TABLE Extends(eID int NOT NULL,
			oID int NOT NULL,
			aID int NOT NULL,
			PRIMARY KEY (aID, oID),
			FOREIGN KEY(oID) REFERENCES Offer(offerID)
			ON DELETE CASCADE ON UPDATE CASCADE,
			FOREIGN KEY(aID) REFERENCES Application(applicationID)
			ON DELETE CASCADE ON UPDATE CASCADE,
			FOREIGN KEY(eID) REFERENCES Employer(employerID)
			ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE Conducts(eID int NOT NULL, 
	iID int NOT NULL,
	aID int NOT NULL, 
	PRIMARY KEY(iID, aID),
	FOREIGN KEY(eID) REFERENCES Employer(employerID)
	ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(iID) REFERENCES Interview(interviewID)
	ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(aID) REFERENCES Application(applicationID)
	ON DELETE CASCADE ON UPDATE CASCADE) ;

INSERT INTO Application
VALUES
	('2020-11-07 10:32:29', 0, 'EPresleyCV.pdf'),
	('2020-11-07 12:29:05', 1, 'Paul_McCartnery_Resume.pdf'),
	('2020-11-08 15:22:10', 2, 'Tom-S-Resume.pdf'),
	('2020-11-09 11:29:23', 3, 'Micahel-Jackson-Resume-2020.pdf'),
	('2020-11-10 18:05:36', 4, 'BSpringsteenResume.pdf'),
	('2020-11-06 19:53:41', 5, 'EPresleyCV.pdf'),
	('2020-11-06 12:25:36', 6, 'Paul_McCartnery_Resume.pdf'),
    ('2019-1-04 3:23:1', 7, 'Alan_TuringCV.pdf'),
    ('2019-6-1 1:1:1', 8, 'larrypage.pdf'),
    ('2019-5-11 1:33:33', 9, 'enrico-fermi-dr_cv.pdf'),
    ('2019-5-22 12:12:12', 10, 'RICHARDFEYNMANSAPP.pdf'),
    ('2019-5-2 11:32:1', 11, 'rosalinfranklinapp11122.pdf'),
    ('2019-5-1 1:1:1', 12, 'terrence_tao.pdf'),
    ('2019-5-1 1:1:1', 13, 'nteslaresume.pdf');
    
	
INSERT INTO Jobseeker
VALUES
	(0, 'epresley@comcast.net', '123password', 'Elvis Presley'),
	(1, 'paulmmccartney@live.com', 'password', 'Paul McCartney'),
	(2, 't.scholz@gmail.com', 'newpassword', 'Tom Scholz'),
	(3, 'michaelj@gmail.com', 'password', 'Michael Jackson'),
	(4, 'brucespring@live.ca', '12345678', 'Bruce Springsteen'),
    (31, 'ttao111@math.ucla.edu', 'nmbrthry', 'Terrence Tao'), 
    (101, 'screwedison292@protonmail.com', 'ptnt', 'Nikola Tesla'),
    (4313, 'wheresmynobelprize@gmail.com', 'dna', 'Rosalin Franklin'),
    (303, 'lpage@gmail.com', 'google', 'Larry Page');
    

INSERT INTO Company
VALUES(134,'google', "dont be evil"),
	   (135, 'facebook', "privacy is our middle name jk"),
       (33, 'white castle', "microwaved to perfection"), 
       (334, 'tim hortons', "the most canadian place on earth"), 
       (9383, 'amazon', "the ever-revolving door"), 
       (3822, 'ubc', "whats our motto again"), 
       (852, 'telus', "isp isp isp"),
       (604, 'sfu', "prison in the mountains");
       
              

INSERT INTO Employer
VALUES(18324, 'mzuckerberg@facebook.com', 'badopsec', 'mark zuckerberg', 135),
	   (97422, 'sbrin@sap.com', 'betteropsec', 'sergei brin', 135),
       (13833, 'thortons@hotmail.com', '1234', 'tim horton phd', 334),
       (3993, 'jbezos@ebay.com', 'trillionaire', 'jeffrey bezos', 9383),
       (7222, 'sfu@sfu.ca', 'asfff', 'simon fraser', 604),
       (1212, 'ubc@ubc.ca', 'ubca', 'ubc founder', 3822);

INSERT INTO E1 
VALUES('this job sucks', 18324, 'engineering');

INSERT INTO Job
VALUES
	('Engineering', 'Software', 100000, 0, "Software Development Engineer", 18324),
	('Engineering', 'Software', 200000, 1, "Senior Software Development Engineer", 18324),
	('Engineering', 'Software', 80000, 2, "Software Engineer Intern", 18324),
    ( 'food and beverage', 'hospitality', 40000, 3, "cashier", 13833),
    ('software', 'software', 1000000, 4, "ceo", 3993),
    ('research engineer', 'research', 1000000, 5, "google lead scientist", 97422),
    ('software dev', 'development', 90000, 6, "ruby ninja", 97422),
    ('education', 'education', 150000, 7, "eecs prof", 3822),
    ('education', 'education', 150000, 8, "english prof", 3822),
    ('education', 'education', 150000, 9, "psych prof", 3822);
    
    
    
INSERT INTO Posting
VALUES 
	(0, '2020-11-01 09:00:00', 0, 'Open'),
	(1, '2020-11-01 10:00:00', 1, 'Open'),
	(2, '2020-11-05 12:30:00', 2, 'Closed'),
    (3, '2020-11-01 12:12:12', 3, 'Closed'), 
    (4, '2019-11-1 12:12:11:', 4, 'Closed'),
	(5, '2019-11-1 12:12:11:', 5, 'Open'),
    (6, '2019-11-1 12:12:11:', 6, 'Closed'),
    (7, '2019-11-1 12:12:11:', 7, 'Open'),
    (8, '2019-11-1 12:12:11:', 8, 'Open'),
    (9, '2019-11-1 12:12:11:', 9, 'Open');
    
   
    
INSERT INTO Apply
VALUES
	(0, 0, 0),
	(0, 1, 1),
	(0, 2, 2),
	(1, 3, 3),
	(1, 4, 4),
	(5, 31, 8),
	(5, 303, 12),
	(5, 101, 13),
    (6, 101, 13),
    (6, 31, 8);

    
				       



-- REPLACE INTO Employer
-- VALUES(18324, 'mzuckerberg@facebook.com', 'badopsec', 'mark zuckerberg', 10034);

-- DELETE FROM Employer WHERE name = 'mark zuckerberg';
-- INSERT INTO Employer
-- VALUES(18324, 'mzuckerberg@facebook.com', 'badopsec', 'mark zuckerberg', 10034);






