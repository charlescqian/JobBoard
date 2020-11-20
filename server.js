require('dotenv').config()

const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

function getConnection() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "jobdb"
    });
}

// Join Query - API endpoint for getting applications of a specific postingID
app.get('/api/applications/:postingID', (req, res) => {
    var con = getConnection();

    con.connect(function(err) {
        if (err) throw err;
        // Create the SQL query with the given postingID
        const sql = `SELECT app.applicationID as id, date_format(app.timeApplied, "%m/%d/%Y %H:%i") as timeApplied, js.name, js.email, app.fileName as resume 
                    FROM Apply a, Application app, jobseeker js 
                    WHERE a.pID=${req.params.postingID} and a.aID = app.applicationID and js.jobseekerID = a.jID
                    ORDER BY timeApplied`;

        // Query the DB
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
})

// Endpoint for Aggregation Group By query, used to count the number of applications for each date
app.get('/api/numApplicationsByDay/:daysBack', (req, res) => {
    var con = getConnection();
    
    con.connect(function(err) {
        if (err) throw err;
        
        // Create the SQL query with the given number of days back
        const sql = `SELECT DATE_FORMAT(app.timeApplied, "%m/%d/%Y") as date, COUNT(*) as count
                    FROM Application app
                    WHERE app.timeApplied BETWEEN NOW() - INTERVAL ${req.params.daysBack} DAY AND NOW()
                    GROUP BY date
                    ORDER BY date`;
        
        // Query the DB
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
})

// Endpoint for Open Positions (projection query)
app.get('/api/openPositions/', (req, res) => {
    var con = getConnection();
    
    con.connect(function(err) {
        if (err) throw err;
        
        // Create the SQL query with the given number of days back
        const sql = `SELECT p.postingID as id, j.jobTitle as title, date_format(p.timePosted, "%m/%d/%Y") as date
                    FROM Posting p, Job j
                    WHERE p.jobID=j.jobID and p.status="Open"`;
        
        // Query the DB
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
})

// Endpoint for ApplicationCount (Aggregation with having query)
app.get('/api/applicationCount/:threshold', (req, res) => {
    var con = getConnection();
    
    con.connect(function(err) {
        if (err) throw err;
        
        // Create the SQL query with the given number of days back
        const sql = `SELECT p.postingID as id, j.jobTitle as title, date_format(p.timePosted, "%m/%d/%Y") as date, count(*) as count
                    FROM Posting p, Job j, Apply a
                    WHERE p.jobID=j.jobID and p.status="Open" and p.postingID=a.pID
                    GROUP BY p.postingID
                    HAVING count(*) >= ${req.params.threshold}
                    ORDER BY date`;
        
        // Query the DB
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
})

// Endpoint for HighestAvgSalary (Nested Aggregation with Group By)
app.get('/api/highestAvgSalary/', (req, res) => {
    var con = getConnection();
    
    con.connect(function(err) {
        if (err) throw err;
        
        // Create the SQL query with the given number of days back
        const sql = `SELECT C.companyName, ROUND(AVG(J.salary), 2) as avgSalary
                    FROM Company C, Job J, Employer E
                    WHERE C.companyID=E.cID and J.eID=E.employerID
                    GROUP BY C.companyID
                    HAVING AVG(J.salary) >= ALL (SELECT AVG(J1.salary)
                                                FROM Company C1, Job J1, Employer E1
                                                WHERE C1.companyID=E1.cID and J1.eID=E1.employerID
                                                GROUP BY C1.companyID)`;
        
        // Query the DB
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
})

// Endpoint to select for postings posted in the last x days (selection query)
app.get('/api/postings/:daysBack', (req, res) => {
    var con = getConnection();
    
    con.connect(function(err) {
        if (err) throw err;
        
        // Create the SQL query with the given number of days back
        const sql = `SELECT p.postingID as id, j.jobTitle as title, date_format(p.timePosted, "%m/%d/%Y") as date
                    FROM Posting p, Job j
                    WHERE p.jobID=j.jobID and p.timePosted BETWEEN NOW() - INTERVAL ${req.params.daysBack} DAY AND NOW()`;
        
        // Query the DB
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
})

// Endpoint to find jobseekers who have applied to all of a user selected set of postings (division)
app.get('/api/applicants/', (req, res) => {
    var con = getConnection();

    con.connect(function(err) {
        if (err) throw err;
        
        // Create the SQL query with the given number of days back
        const sql = `SELECT DISTINCT js.jobseekerID as id, js.name, js.email, app.fileName as resume
                    FROM JobSeeker js, Apply a, Application app
                    WHERE js.jobseekerID=a.jID and app.applicationID=a.aID
                            AND NOT EXISTS (SELECT p.postingID
                                            FROM Posting p
                                            WHERE p.postingID in (${req.query.postingID})
                                                    AND NOT EXISTS (SELECT a1.pID
                                                                    FROM Apply a1
                                                                    WHERE a1.pID=p.postingID
                                                                    AND a1.jID=js.jobseekerID))`;
        
        // Query the DB
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
})

app.listen(port, () =>
  console.log(`Server listening on port ${port}`),
);