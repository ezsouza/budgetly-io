const express = require('express');
const router = express.Router();
const fixedExpenseController = require('../controllers/fixedExpenseController');
const auth = require('../middlewares/authMiddleware');

// Protected route to create a new fixed expense
router.post('/fixed-expenses', auth, fixedExpenseController.createFixedExpense);

module.exports = router;
