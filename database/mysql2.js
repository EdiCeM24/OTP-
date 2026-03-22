const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:  '',
  database: ''
});

// Connect to database
const db = connection.connect((err) => {
  if(err) {
    console.error('MySQL connection error: ', err);
    return;
  }

  console.log('Connected to MySQL!');
});


module.exports = { connection, db }