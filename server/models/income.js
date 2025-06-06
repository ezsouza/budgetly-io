const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Define the Income model with fields and associations
const Income = sequelize.define('Income', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  underscored: true,
  tableName: 'incomes',
});

// Associate income to user
Income.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Income, { foreignKey: 'user_id' });

module.exports = Income;
