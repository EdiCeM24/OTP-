const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');



// IMPORTED MODULES HERE
const { connection } = require('./database/mysql2.js');
const sequelize = require('./config/db.js');



const app = express();
const port = process.env.PORT || 3000;

// IMPORT ROUTES HERE
const authRouter = require('./routes/auth.route.js');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

connection.connect();

// EJS SETUP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// END_POINTS HERE
app.use('/api/v2/auth', authRouter)


 


const startServer = async () => {
  try {
    // 1. Authenticate the connection
    await sequelize.authenticate();
    console.log('DB connected successfully!');

    // 2. Sync models (optional, use with caution in production)
    await sequelize.sync(); 
    console.log('Database synchronized!');

    // 3. Start the server ONLY after successful DB connection and sync
    app.listen(port, () => {
      console.log(`Server running on port localhost:${port}`);
    });

  } catch (err) {
    // Handle any connection or sync errors
    console.error('Unable to connect to the database or sync models:', err);
    // Exit the application if the database connection fails
    process.exit(1); 
  }
};

startServer();