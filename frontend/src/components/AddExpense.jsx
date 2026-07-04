import { useState } from "react";
import http from "../utils/http";

const AddExpense = ({
  onClose,
  onExpenseAdded,
  editingExpense,
}) => {
  const [title, setTitle] = useState(editingExpense?.title || "");
  const [amount, setAmount] = useState(editingExpense?.amount || "");
  const [category, setCategory] = useState(editingExpense?.category || "");
  const [type, setType] = useState(editingExpense?.type || "expense");
  const [date, setDate] = useState(
    editingExpense?.date
      ? editingExpense.date.split("T")[0]
      : ""
  );
  const [description, setDescription] = useState(
    editingExpense?.description || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingExpense) {
        const response = await http.put(
          `/expense/update/${editingExpense._id}`,
          {
            title,
            amount: Number(amount),
            category,
            type,
            date,
            description,
          }
        );

        alert(response.data.message);
      } else {
        const response = await http.post("/expense/add", {
          title,
          amount: Number(amount),
          category,
          type,
          date,
          description,
        });

        alert(response.data.message);
      }

      onExpenseAdded();
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to save expense");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white dark:bg-gray-900 w-[550px] rounded-2xl shadow-2xl p-8 transition-all">

        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          {editingExpense ? "Edit Expense" : "Add Expense"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select Category</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Salary</option>
            <option>Investment</option>
            <option>Other</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <textarea
            placeholder="Description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex justify-end gap-4 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition"
            >
              {editingExpense ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddExpense;