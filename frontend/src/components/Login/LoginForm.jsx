import React, { useState } from "react";
import { useAuth } from "./../../context/AuthContext";
import { loginUser } from "./../../services/authServices";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const credentials = {
        username: username.trim(),
        password: password.trim(),
      };

      const response = await loginUser(credentials);

      if (response.status === "success") {
        authLogin(response.data.user, response.data.token);
        navigate("/dashboard", { state: { message: response.message } }); 
      } else {
        setError(response.message || "Login failed.");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again later.");
      setUsername("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label className="block text-sm sm:text-base font-medium mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm sm:text-base font-medium mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm sm:text-base mb-4">{error}</p>}
      <button
      type="submit"
      className={`w-full bg-[#fc9319] px-4 py-2 rounded-md border-2 transition-all duration-300 text-sm sm:text-base md:text-lg ${
        loading
          ? "text-[#fc9319] hover:bg-white hover:text-[#fc9319]" // Text color during loading
          : "text-white hover:bg-white hover:text-[#fc9319]" // Default text color
      }`}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <ClipLoader size={20} color="#fc9319" /> {/* Spinner with color #fc9319 */}
          <span>Loading...</span> {/* Optional: Add loading text */}
        </div>
      ) : (
        "Login"
      )}
    </button>
    </form>
  );
};

export default LoginForm;
