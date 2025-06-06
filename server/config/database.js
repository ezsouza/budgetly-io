const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with the database URI from .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
