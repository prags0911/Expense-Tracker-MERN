import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import http from "../utils/http";
const ResetPass = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await http.post("/user/reset-password",
        {
            email,
            otp: otp.trim(),
            password: newPassword,
        });
        alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Reset Pssword Error",error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-2xl w-[600px] p-10">

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter the OTP sent to your email and create a new password.
        </p>

        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-5"
        >

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Enter 6 Digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-b-2 border-gray-300 p-3 outline-none focus:border-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Reset Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPass;

