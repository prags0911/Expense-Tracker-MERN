import ExpenseModel from "./expense.model.js";

export const addExpense = async (req, res) => {
  try {
    const {
      title,
      amount,
      category,
      type,
      date,
      description,
    } = req.body;

    const expense = new ExpenseModel({
      title,
      amount,
      category,
      type,
      date,
      description,
      user: req.user.id,
    });

    await expense.save();

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseModel.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json(expenses);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await ExpenseModel.findOneAndDelete({
            _id: id,
            user: req.user.id,
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        res.json({
            message: "Expense deleted successfully",
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await ExpenseModel.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json({
      message: "Expense updated successfully",
      expense,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};