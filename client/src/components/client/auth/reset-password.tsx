import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SectionTitle from "../layout/sections/section-title";
import HeaderTop from "../layout/sections/header-top";
import Footer from "../layout/sections/footer";
import Header from "../layout/sections/header";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../../paths";
import { useResetPasswordMutation } from "../../../redux/client/userReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { loginUser } from "../../../redux/client/userSlice";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { email } = useLocation().state;

  const router = useNavigate();
  const [resetpassword] = useResetPasswordMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleResetPassword = async () => {
    if (password === confirmPassword) {
      try {
        const body = {
          email,
          newPassword: password,
        };
        const response = await resetpassword(body).unwrap();
        const user: any = {
          token: response.token,
          role: response.role,
        };
        dispatch(loginUser(user));
        toast.success(response.msg);
      } catch (error: any) {
        toast.error(error.data?.msg);
      }
    } else {
      toast.error("Passwords do not match!");
    }
  };

  return (
    <div className="bg-white">
      <HeaderTop />
      <Header isSearch="" />
      <SectionTitle title="Reset Password" path="Home | Reset Password" />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-normal leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-2xl sm:rounded-lg sm:px-12">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <AiFillEyeInvisible size={22} className="text-gray-500" />
                    ) : (
                      <AiFillEye size={22} className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2 relative">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {!showConfirmPassword ? (
                      <AiFillEyeInvisible size={22} className="text-gray-500" />
                    ) : (
                      <AiFillEye size={22} className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
