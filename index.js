import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';



// IMPORTED MODULES HERE
import sequelize from './config/db.js';
import { PORT } from './config/env.js';



const app = express();
// const PORT = process.env.PORT || 3000;

// IMPORT ROUTES HERE
import authRouter from './routes/auth.route.js';


// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());



// EJS SETUP
app.set('view engine', 'ejs');
app.set('views', path.join('views'));

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
    app.listen(PORT, () => {
      console.log(`Server running on port localhost:${PORT}`);
    });

  } catch (err) {
    // Handle any connection or sync errors
    console.error('Unable to connect to the database or sync models:', err);
    // Exit the application if the database connection fails
    process.exit(1); 
  }
};

startServer();