import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const User = sequelize.define('editable', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },  
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
  },  
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },  
}, {timestamps: true});

export default User;




