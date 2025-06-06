const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const auth = require('../middlewares/authMiddleware');

// Protected route to create a new income
router.post('/incomes', auth, incomeController.createIncome);

module.exports = router;
