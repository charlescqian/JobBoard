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

app.get('/api/applications/:postingID', (req, res) => {
    var con = getConnection();

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected");
        var sql = `select app.timeApplied, js.name, js.email, app.fileName from Apply a, Application app, jobseeker js where a.pID=${req.params.postingID} and a.aID = app.applicationID and js.jobseekerID = a.jID`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
})


// var con = getConnection()

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     // var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//     // con.query(sql, function (err, result) {
//         // if (err) throw err;
//         // console.log("Table created");
//     // });
//     var sql = "select app.timeApplied, js.name, js.email, app.fileName from Apply a, Application app, jobseeker js where a.pID=0 and a.aID = app.applicationID and js.jobseekerID = a.jID";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log(result);
//     });
//     // con.query("SELECT * FROM customers", function (err, result, fields) {
//     //     if (err) throw err;
//     //     console.log(result);
//     // });
// });

app.listen(port, () =>
  console.log(`Listening on port ${port}!`),
);