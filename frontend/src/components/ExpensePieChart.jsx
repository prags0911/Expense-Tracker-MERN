import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ expenses }) => {
  const expenseData = expenses.filter(
    (item) => item.type === "expense"
  );

  const categories = {};

  expenseData.forEach((item) => {
    if (categories[item.category]) {
      categories[item.category] += item.amount;
    } else {
      categories[item.category] = item.amount;
    }
  });

  const data = {
    labels: Object.keys(categories),

    datasets: [
      {
        data: Object.values(categories),

        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8BC34A",
        ],

        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  if (expenseData.length === 0) {
    return (
      <>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Expenses by Category
        </h2>

        <div className="flex justify-center items-center h-72">
          <p className="text-gray-500 dark:text-gray-400">
            No expense data available
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Expenses by Category
      </h2>

      <div className="w-72 h-72 mx-auto">
        <Pie
          data={data}
          options={{
            maintainAspectRatio: false,

            plugins: {
              legend: {
                position: "bottom",

                labels: {
                  color: document.documentElement.classList.contains("dark")
                    ? "#ffffff"
                    : "#374151",
                  font: {
                    size: 13,
                  },
                },
              },

              tooltip: {
                backgroundColor: "#1f2937",
                titleColor: "#fff",
                bodyColor: "#fff",
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default ExpensePieChart;