const Income = require('../models/income');

// POST /incomes - create a new income for the authenticated user
exports.createIncome = async (req, res) => {
  const { amount, description, date } = req.body;

  // Validate amount is a positive number
  if (amount === undefined || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number' });
  }

  // Validate date format YYYY-MM-DD
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' });
  }

  // Validate description length if provided
  if (description && description.length > 255) {
    return res.status(400).json({ message: 'Description too long' });
  }

  try {
    const income = await Income.create({
      user_id: req.userId,
      amount,
      description,
      date,
    });
    return res.status(201).json(income);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to create income' });
  }
};
