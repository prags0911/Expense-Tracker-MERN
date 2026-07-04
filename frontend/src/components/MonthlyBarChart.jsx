import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const MonthlyBarChart = ({ expenses }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyExpense = new Array(12).fill(0);

  expenses
    .filter((item) => item.type === "expense")
    .forEach((item) => {
      const month = new Date(item.date).getMonth();
      monthlyExpense[month] += Number(item.amount);
    });

  const isDark = document.documentElement.classList.contains("dark");

  const data = {
    labels: months,
    datasets: [
      {
        label: "Expenses",
        data: monthlyExpense,
        backgroundColor: "#7C3AED",
        borderRadius: 10,
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },

    scales: {
      x: {
        ticks: {
          color: isDark ? "#ffffff" : "#374151",
        },
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: isDark ? "#ffffff" : "#374151",
        },

        grid: {
          color: isDark ? "#374151" : "#E5E7EB",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 md:p-6 h-[350px] md:h-[420px]">

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Monthly Expenses
      </h2>

      <div className="h-[320px]">
        <Bar data={data} options={options} />
      </div>

    </div>
  );
};

export default MonthlyBarChart;