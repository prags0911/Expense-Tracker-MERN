import { useTheme } from "../context/ThemeContext";
import MonthlyBarChart from "../components/MonthlyBarChart";
import ExpenseCard from "../components/ExpenseCard";
import AddExpense from "../components/AddExpense";
import ExpensePieChart from "../components/ExpensePieChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../utils/http";

const Dashboard = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const { darkMode, setDarkMode } = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const fetchExpenses = async () => {
    try {
      const response = await http.get("/expense/all");
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const income = expenses
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = expenses
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;

    try {
      const response = await http.delete(`/expense/delete/${id}`);
      alert(response.data.message);
      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete expense");
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-950 dark:to-black transition-all duration-300">

      {/* Navbar */}
     <div className="bg-white dark:bg-gray-900 shadow-md px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
      <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
      Expense Tracker
      </h1>
      <div className="flex items-center gap-5">
    {/* Dark Mode Button */}
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>

    {/* Avatar */}

    <div className="flex items-center gap-3">

      <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
        {user?.fullname?.charAt(0).toUpperCase() || "U"}
      </div>

      <div className="hidden md:block">

        <p className="font-semibold text-gray-900 dark:text-white">
          {user?.fullname}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {user?.email}
        </p>

      </div>

    </div>

    {/* Logout */}

    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
    >
      Logout
    </button>

  </div>

</div>

      {/* Dashboard */}
      <div className="p-5 md:p-10">

        {/* Heading */}
        <div className="flex justify-between items-center mb-10">

          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Expense Dashboard
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 md:px-5 py-2 md:py-3 rounded-lg font-semibold"
          >
            + Add Expense
          </button>

        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all">
            <h3 className="text-lg text-gray-500 dark:text-gray-300 font-medium">
              Total Balance
            </h3>

            <p className="text-4xl mt-4 font-bold text-green-500">
              ₹{balance}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all">
            <h3 className="text-lg text-gray-500 dark:text-gray-300 font-medium">
              Income
            </h3>

            <p className="text-4xl mt-4 font-bold text-blue-500">
              ₹{income}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all">
            <h3 className="text-lg text-gray-500 dark:text-gray-300 font-medium">
              Expenses
            </h3>

            <p className="text-4xl mt-4 font-bold text-red-500">
              ₹{expense}
            </p>
          </div>

        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all">
            <ExpensePieChart expenses={expenses} />
          </div>

          {/* Transactions */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 h-[500px] flex flex-col">

            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Recent Transactions
            </h2>

            {expenses.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No transactions found.
              </p>
            ) : (
              <div className="space-y-4 overflow-y-auto pr-2 flex-1">
                {expenses.map((item) => (
                  <ExpenseCard
                    key={item._id}
                    expense={item}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Monthly Bar Chart */}
        <div className="mt-10">
          <MonthlyBarChart expenses={expenses} />
        </div>

      </div>

      {showModal && (
        <AddExpense
          onClose={() => {
            setShowModal(false);
            setEditingExpense(null);
          }}
          onExpenseAdded={fetchExpenses}
          editingExpense={editingExpense}
        />
      )}

    </div>
  );
};

export default Dashboard;