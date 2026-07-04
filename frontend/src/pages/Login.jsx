import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import expenseImg from "../assets/exepnse-login.png";
import http from "../utils/http";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post("/user/login",{
            email,
            password,
          });
      alert(response.data.message);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
        JSON.stringify(response.data.user)
        );
        navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:",error);
      alert(error.response?.data?.message ||"Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-[1100px] h-[650px] flex">

        {/* Left Section */}
        <div className="w-1/2 p-12 flex flex-col justify-center">

          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome Back!!
          </h1>

          <p className="text-gray-500 mb-8">
            Login to continue tracking your expenses.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:underline"
            >
              Forgot Password?
            </Link>

            <button
              type="submit"
              className="bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Login
            </button>

            <p className="text-center text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-600 font-semibold hover:underline"
              >
                Create Account
              </Link>
            </p>

          </form>

        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-[#0f1f7a] flex items-center justify-center p-6">

          <img
            src={expenseImg}
            alt="Expense Tracker"
            className="max-w-full max-h-full object-contain"
          />

        </div>

      </div>

    </div>
  );
};

export default Login;