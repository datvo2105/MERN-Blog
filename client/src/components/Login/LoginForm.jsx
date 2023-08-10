import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: "/auth/login",
        data: {
          email,
          password,
        },
        withCredentials: true,
      }).then((res) => {
        if (res.data === "ok") {
          return setRedirect(true);
        }
      });
    } catch (error) {
      alert("Something wrong. Can't login!");
    }
  };
  if (redirect) return <Navigate to={"/"} />;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 border-t border-gray-200 pt-10 ">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-8 text-center text-6xl font-bold leading-9 tracking-tight text-gray-900">
                Login
              </h2>
            </div>

            <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                You aren't a member?{" "}
                <Link
                  to="/auth/register"
                  className="font-semibold leading-6 text-gray-800 hover:text-gray-500"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
