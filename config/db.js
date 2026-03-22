import { Sequelize } from 'sequelize';

// Create connection
const sequelize = new Sequelize( 'myadmin', 'root', '', {
  host: 'localhost',
  dialect:'mysql'
});

export default sequelize;