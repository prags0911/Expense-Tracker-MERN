import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import http from "../utils/http";
const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post( "/user/forgot-password",{
        email,
      });

      alert(response.data.message);
        navigate("/reset-password", {
          state: { email },
        });
    } catch (err) {
      console.error("Forgot Password error:",err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-[550px] p-10">
        <h1 className="text-4xl font-bold text-center mb-4">
          Forgot Password
        </h1>

        <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 border-gray-300 p-3 outline-none"
            required
          />

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;