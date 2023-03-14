const mysql = require('mysql2');
const express = require('express');
require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) {
        console.log('Error connecting to database:', error);
    } else {
        console.log('Connected to database');
    }
});



// function handleDisconnect() {
//     connection = mysql.createConnection(db_config); // Recreate the connection, since
//     // the old one cannot be reused.

//     connection.connect(function (err) {              // The server is either down
//         if (err) {                                     // or restarting (takes a while sometimes).
//             console.log('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//         }                                     // to avoid a hot loop, and to allow our node script to
//     });                                     // process asynchronous requests in the meantime.
//     // If you're also serving http, display a 503 error.
//     connection.on('error', function (err) {
//         console.log('db error', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//             handleDisconnect();                         // lost due to either server restart, or a
//         } else {                                      // connnection idle timeout (the wait_timeout
//             throw err;                                  // server variable configures this)
//         }
//     });
// }

// handleDisconnect();

const app = express();
app.use(express.static('public'))
    .use(express.urlencoded({ extended: false }));

app.post('/submit', (req, res) => {
    const email = req.body.email;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log('Invalid email format');
        res.send('Invalid email format');
        return;
    }

    const query = 'INSERT INTO users (email) VALUES (?)';
    const values = [email];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log('Error inserting email:', error);
            res.send('Error inserting email');
        } else {
            console.log('Email inserted:', results);
            res.send('Email submitted');
        }
    });
});



app.listen(3000, () => {
    console.log('Server started on port 3000');
});
