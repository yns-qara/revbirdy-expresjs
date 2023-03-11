const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { response } = require('express');

// Set up express app
const app = express();

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'younesqara',
  database: 'revdb'
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    response.send("done");
});

// Set up route to handle form submissions
app.post('/submit-email', (req, res) => {
  const email = req.body.email;

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).send('Invalid email format');
  }

  // Verify email using external service or manual verification
  // ...

  // Save email to database
  const sql = 'INSERT INTO emails (email) VALUES (?)';
  connection.query(sql, [email], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('Email already exists');
      } else {
        console.error('Error saving email to MySQL database:', err);
        return res.status(500).send('Internal server error');
      }
    }
    res.status(200).send('Email saved successfully');
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Helper function to validate email format
function isValidEmail(email) {
  // Use regex to validate email format
  const regex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
  return regex.test(email);
}
