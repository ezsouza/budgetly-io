const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', authRoutes); // Prefix routes with /api
app.use('/api', incomeRoutes); // Routes for incomes

// Connect to the database and start the server
async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync(); // Sync models (in production use migrations)
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

start();

module.exports = app;
