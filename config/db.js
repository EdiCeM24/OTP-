import { Sequelize } from 'sequelize';
import { DATABSE_NAME, DATABSE_USERNAME, DATABSE_PASSWORD } from './env.js';

// Create connection
const sequelize = new Sequelize( DATABSE_NAME, DATABSE_USERNAME, DATABSE_PASSWORD, {
  host: 'localhost',
  dialect:'mysql'
});

export default sequelize;