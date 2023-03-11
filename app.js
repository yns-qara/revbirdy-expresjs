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
