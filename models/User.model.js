const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');


const User = sequelize.define('ediTable', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },  
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },  
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },  
}, {timestamps: true});

module.exports = User;




