DROP DATABASE IF EXISTS jobdb;
CREATE DATABASE jobdb;
use jobdb;

CREATE TABLE Application(timeApplied DATETIME(6),
			applicationID int,
			PRIMARY KEY(applicationID)
            );

CREATE TABLE Jobseeker(jobseekerID int,
			  email CHAR(20) NOT NULL,
			  password CHAR(20) NOT NULL,
			  name CHAR(20) NOT NULL,
			PRIMARY KEY(jobseekerID),
UNIQUE(email));


CREATE TABLE Company( companyID int,
			  companyName CHAR(50),
			  companyDescription TEXT,
			  PRIMARY KEY (companyID));



CREATE TABLE Employer(employerID int,
			  email CHAR(20) NOT NULL,
			  password CHAR(20) NOT NULL,
			  name CHAR(20) NOT NULL,
			  cID int,
			  UNIQUE(email),
			  PRIMARY KEY(employerID),
			  FOREIGN KEY(cID) REFERENCES Company(companyID)
			ON DELETE CASCADE ON UPDATE CASCADE);	


CREATE TABLE E1(jobDescription TEXT,
				eID int,
		         department char(50),
		         PRIMARY KEY(jobDescription),
				FOREIGN KEY (eID) REFERENCES Employer(employerID)
	                    ON DELETE CASCADE);

 CREATE TABLE Job(jobtype CHAR(20),
		       industryType CHAR(20),
                                      salary DECIMAL(19,2),
                                     jobID int,
                                      jobDescription TEXT, 
		   eID int NOT NULL,
		    PRIMARY KEY(jobID), 
		    FOREIGN KEY(eID) REFERENCES Employer(employerID)
		      ON DELETE NO ACTION);

CREATE TABLE J1(jobAddress CHAR(50),
		        industryType CHAR(20),
				companyName CHAR(50),
		        PRIMARY KEY(jobAddress, industryType),
        FOREIGN KEY(jobAddress, industryType) REFERENCES Job(jobID)
        ON DELETE CASCADE);

CREATE TABLE Posting(postingID int,
				numOfApplicants INT(10), 
				timePosted DATETIME(6), 
			jID int NOT NULL,
			PRIMARY KEY(postingID),
			FOREIGN KEY(jID) REFERENCES Job(jobID)
				ON DELETE NO ACTION);
                



CREATE TABLE Interview(interviewID int,
			  interviewLocation CHAR(100),
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
					
		   

CREATE TABLE Resume(fileName CHAR(100),
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



