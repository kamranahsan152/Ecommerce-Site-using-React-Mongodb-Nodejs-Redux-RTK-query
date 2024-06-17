import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../redux/store";
import { Popover } from "@headlessui/react";
import { useUserDataQuery } from "../../../../redux/client/userReducer";
import { FaPhone, FaSpinner } from "react-icons/fa";
import { paths } from "../../../../paths";
import { logOut } from "../../../../redux/client/userSlice";

const HeaderTop = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { data: userInfo, isLoading, isSuccess } = useUserDataQuery("");
  const router = useNavigate();
  const handleLogout = () => {
    dispatch(logOut());
    setIsPopoverOpen(false); // Close the popover after logout
    toast.success("Logout successful!");
    router(paths.client.index);
  };

  return (
    <div className="h-10 text-white bg-blue-500 max-lg:px-5 max-lg:h-16 max-[573px]:px-0">
      <div className="flex justify-end h-full max-lg:flex-col max-lg:justify-center max-lg:items-center max-w-screen-2xl mx-auto px-12 max-[573px]:px-0">
        <ul className="flex items-center gap-x-5 h-full max-[370px]:text-sm max-[370px]:gap-x-2 font-semibold">
          {!isAuthenticated ? (
            <>
              <li className="flex items-center">
                <Link
                  to="/login"
                  className="flex items-center gap-x-2 font-semibold"
                >
                  <FaRegUser className="text-white" />
                  <span>Login</span>
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/register"
                  className="flex items-center gap-x-2 font-semibold"
                >
                  <FaRegUser className="text-white" />
                  <span>Register</span>
                </Link>
              </li>
            </>
          ) : (
            <Popover className="relative">
              {({ open }: any) => (
                <>
                  <Popover.Button
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    className="flex items-center gap-x-2 font-semibold outline-none"
                  >
                    <FaRegUser className="text-white" />
                    {isLoading ? (
                      <FaSpinner
                        className="text-blue-500 animate-spin"
                        size={35}
                      />
                    ) : (
                      userInfo && <span>{userInfo?.user?.email}</span>
                    )}
                  </Popover.Button>

                  {open && (
                    <Popover.Panel className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="p-4">
                        <p className="text-gray-900 font-medium">
                          {isSuccess && userInfo?.user?.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {isSuccess && userInfo?.user?.email}
                        </p>
                        <button
                          onClick={handleLogout}
                          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Log out
                        </button>
                      </div>
                    </Popover.Panel>
                  )}
                </>
              )}
            </Popover>
          )}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(HeaderTop);
