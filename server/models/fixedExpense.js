const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Define the FixedExpense model with fields and associations
const FixedExpense = sequelize.define('FixedExpense', {
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
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  underscored: true,
  tableName: 'fixed_expenses',
});

// Associate fixed expense to user
FixedExpense.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(FixedExpense, { foreignKey: 'user_id' });

module.exports = FixedExpense;
