import { useState } from "react";
import { useNavigate } from "react-router-dom";
import expenseImg from "../assets/expense-signup.png";
import http from "../utils/http";
const Signup = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await http.post("/user/signup",{
        fullname,
        mobile,
        email,
        password,
      });
      alert(response.data.message);
      navigate("/verify-otp", {
          state: { email },
        });
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-[1100px] h-[650px] flex">

        {/* Left Section - Signup Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">

          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Create Account
          </h1>

          <p className="text-gray-500 mb-8">
            Start tracking your expenses today.
          </p>

          <form
            onSubmit={handleSignup}
            className="flex flex-col gap-5"
          >

            <input
              type="text"
              placeholder="Enter Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />

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
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />

            <button
              type="submit"
              className="bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Create Account
            </button>

            <p className="text-center text-gray-500">
              Already have an account?{" "}
              <a
                href="/"
                className="text-purple-600 font-semibold hover:underline"
              >
                Login
              </a>
            </p>

          </form>
        </div>

        {/* Right Section - Image */}
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

export default Signup;