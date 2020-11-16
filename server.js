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

// API endpoint for getting applications of a specific postingID
app.get('/api/applications/:postingID', (req, res) => {
    var con = getConnection();

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected");
        // Create the SQL query with the given postingID
        var sql = `select app.applicationID as id, date_format(app.timeApplied, "%m/%d/%Y %H:%i") as timeApplied, js.name, js.email, app.fileName as resume from Apply a, Application app, jobseeker js where a.pID=${req.params.postingID} and a.aID = app.applicationID and js.jobseekerID = a.jID`;
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