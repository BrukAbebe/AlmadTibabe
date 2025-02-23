import React from "react";
import LoginForm from "./../components/Login/LoginForm";
import logo from "../assets/logo.jpg";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center p-4 mt-40 mb-0 sm:mb-8"> 
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <img src={logo} alt="Logo" className="h-12 mx-auto mb-6" />
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;