/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AppDispatch } from "../../../../redux/store";
import { clearUser } from "../../../../redux/authSlice";
import { useUserInfoQuery } from "../../../../redux/reducer";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: userData } = useUserInfoQuery("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
      <div className="text-xl font-sans">Dashboard</div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-lg focus:outline-none"
        >
          <FaUserCircle className="mr-2 text-3xl" />
          <span>{userData?.user?.name || "Loading..."}</span>
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-52 z-50 bg-white border rounded-lg shadow-lg">
            <div className="h-30 px-4 py-1">
              <div className="text-base font-sans text-black">
                {userData?.user?.email}
              </div>
              <div className="text-base font-bold text-gray-800">
                {userData?.user?.role?.toUpperCase()}
              </div>
            </div>
            <a
              onClick={() => {
                dispatch(clearUser());
                toast.success("Logged-out Success!");
              }}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
