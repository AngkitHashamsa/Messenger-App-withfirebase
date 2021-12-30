import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuthProvider } from "../context";
const Login = () => {
  const {
    showPassword,
    password,
    setPassword,
    email,
    setEmail,
    handleCLick,
    handleLoginSubmit,
    loading,
  } = useAuthProvider();
  return (
    <main className="pt-20">
      <div className="section-center h-screen ">
        <form
          className="flex flex-col justify-center items-center "
          // autoComplete="off"
          // noValidate
          onSubmit={(e) => handleLoginSubmit(e)}
        >
          <div className="pt-12 pb-12 px-8 shadow-md rounded-lg bg-white">
            <h2 className="text-center font-semibold text-gray-600 pb-4 tracking-wide text-lg">
              Log In
            </h2>

            <div className="mb-3 flex flex-col">
              <label htmlFor="userName" className="text-gray-500 pl-2 ">
                Email
              </label>
              <input
                type="email"
                className="flex-1 px-3 py-3 rounded-lg shadow-lg focus:outline-none text-gray-500"
                name="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col relative ">
              <label htmlFor="password" className="text-gray-500 pl-2 ">
                Password
              </label>

              {showPassword ? (
                <input
                  type="text"
                  className="flex-1 px-3 py-3 rounded-lg shadow-lg focus:outline-none text-gray-500"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <input
                  type="password"
                  className="flex-1 px-3 py-3 rounded-lg shadow-lg focus:outline-none text-gray-500"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              {showPassword ? (
                <button
                  type="button"
                  className="absolute top-10 right-2 text-gray-400"
                  onClick={(e) => handleCLick(e)}
                >
                  <AiOutlineEyeInvisible />
                </button>
              ) : (
                <button
                  type="button"
                  className=" absolute top-10 right-2 text-gray-400"
                  onClick={(e) => handleCLick(e)}
                >
                  <AiOutlineEye />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-400 text-white py-2 px-3 tracking-wide rounded-md hover:bg-blue-500"
            >
              {loading ? "logging in..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
