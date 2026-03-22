const { Sequelize } = require('sequelize');

// Create connection
const sequelize = new Sequelize( 'myAdmin', 'root', '', {
  host: 'localhost',
  dialect:'mysql'
});

module.exports = sequelize;