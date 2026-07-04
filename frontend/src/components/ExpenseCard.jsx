import { FaTrash, FaEdit } from "react-icons/fa";

const ExpenseCard = ({ expense, onDelete, onEdit }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">

      {/* Left Side */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          {expense.title}
        </h4>

        <p className="text-sm text-gray-500 dark:text-gray-300">
          {expense.category}
        </p>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {new Date(expense.date).toLocaleDateString()}
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        <p
          className={`text-lg font-bold ${
            expense.type === "income"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {expense.type === "income" ? "+" : "-"} ₹{expense.amount}
        </p>

        <button
          onClick={() => onEdit(expense)}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
          title="Edit Expense"
        >
          <FaEdit size={18} />
        </button>

        <button
          onClick={() => onDelete(expense._id)}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
          title="Delete Expense"
        >
          <FaTrash size={18} />
        </button>

      </div>

    </div>
  );
};

export default ExpenseCard;