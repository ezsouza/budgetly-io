const FixedExpense = require('../models/fixedExpense');

// POST /fixed-expenses - create a new fixed expense for the authenticated user
exports.createFixedExpense = async (req, res) => {
  const { amount, description, due_date } = req.body;

  // Validate amount is a positive number
  if (amount === undefined || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number' });
  }

  // Validate due_date format YYYY-MM-DD and day of month 1-31
  if (!due_date || !/^\d{4}-\d{2}-\d{2}$/.test(due_date)) {
    return res.status(400).json({ message: 'Invalid due_date format. Use YYYY-MM-DD' });
  }
  const day = Number(due_date.split('-')[2]);
  if (day < 1 || day > 31) {
    return res.status(400).json({ message: 'Invalid due date day' });
  }

  // Validate description length if provided
  if (description && description.length > 255) {
    return res.status(400).json({ message: 'Description too long' });
  }

  try {
    const fixedExpense = await FixedExpense.create({
      user_id: req.userId,
      amount,
      description,
      due_date,
    });
    return res.status(201).json(fixedExpense);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to create fixed expense' });
  }
};
