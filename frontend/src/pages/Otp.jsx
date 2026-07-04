import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import http from "../utils/http";
const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(
    location.state?.email || ""
  );

  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post("/user/verify-otp",{
            email,
            otp: otp.trim(),});
      alert(response.data.message);
        navigate("/");
    } catch (error) {
      console.error("OTP Error:", error);
      alert(error.response?.data?.message ||"Failed to verify OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-2xl w-[550px] p-10">

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter the OTP sent to your email address
        </p>

        <form
          onSubmit={handleVerifyOtp}
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

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Verify OTP
          </button>

          <p className="text-center text-gray-500 text-sm">
            After successful verification, you will be redirected to Login.
          </p>
        </form>

      </div>

    </div>
  );
};

export default Otp;