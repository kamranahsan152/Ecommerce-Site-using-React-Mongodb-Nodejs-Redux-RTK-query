import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SectionTitle from "../layout/sections/section-title";
import HeaderTop from "../layout/sections/header-top";
import Footer from "../layout/sections/footer";
import Header from "../layout/sections/header";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../paths";
import { useLoginMutation } from "../../../redux/client/userReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { loginUser } from "../../../redux/client/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();

  const router = useNavigate();

  const handleSignIn = async () => {
    const body: any = {
      email,
      password,
    };

    try {
      const response = await login(body).unwrap();

      if (response.role === "admin") {
        toast.error("Invalid Login");
        return;
      } else if (response.role !== "user") {
        const data: any = {
          msg: "Invalid login",
        };
        throw new Error(data.msg);
      } else {
        const user: any = {
          token: response.token,
          role: response.role,
        };
        dispatch(loginUser(user));
        toast.success(response.success);
        router(paths.client.index);
      }
    } catch (error: any) {
      toast.error(error?.data?.msg || "Login failed");
    }
  };

  const handleSignUp = () => {
    router(paths.client.register);
  };

  const handleForgetPassword = () => {
    if (email !== "") {
      router(paths.client.resetpassword, { state: { email } });
    } else {
      toast.error("Please enter email first!");
    }
  };

  return (
    <div className="bg-white">
      <HeaderTop />
      <Header isSearch="" />
      <SectionTitle title="Login" path="Home | Login" />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-normal leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-2xl sm:rounded-lg sm:px-12">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                    className="block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEye size={22} className="text-gray-500" />
                    ) : (
                      <AiFillEyeInvisible size={22} className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm leading-6">
                  <a
                    onClick={handleForgetPassword}
                    className="font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="relative mt-10">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">Or</span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full flex justify-center py-2 px-4 mt-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign up
              </button>
              <p className="text-red-600 text-center text-[16px] my-4">
                {/* {error && error} */}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
