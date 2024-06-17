import React, { useCallback, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../paths";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

const Header = ({ isSearch, onSearchChange }: any) => {
  const [searchValue, setSearchValue] = useState("");

  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const handleSearchChange = useCallback((event: any) => {
    const value = event.target.value;
    setSearchValue(value);
    if (value === "") {
      onSearchChange(""); // If input is cleared, show all data
    }
  }, []);

  const handleSearch = useCallback(() => {
    onSearchChange(searchValue);
  }, [searchValue]);
  const router = useNavigate();
  return (
    <header
      className={`flex shadow-md items-center container flex-wrap pb-2 pt-2  bg-white ${
        isSearch === paths.client.productpage
          ? `justify-evenly`
          : `justify-center`
      } ${
        isSearch === paths.client.index && "justify-around lg:h-20"
      } lg:h-28 ${
        isSearch === paths.client.productbyId && "justify-around lg:h-20"
      }`}
    >
      <div
        className={`${
          isSearch === paths.client.productpage ? "" : `text-center`
        }`}
      >
        <div className="text-2xl font-bold text-black">
          STORONIC<span className="text-blue-500">SHOP</span>
        </div>
        <div className="text-lg text-gray-500 font-sans">
          ELECTRONIC ECOMMERCE
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {isSearch === paths.client.productpage ? (
          <>
            <div>
              <input
                type="text"
                placeholder="Search Product"
                value={searchValue}
                onChange={handleSearchChange}
                className="px-4 py-2 lg:w-96 border rounded-l-md border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
              >
                Search
              </button>
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => {
                router(paths.client.cart);
              }}
            >
              <FaShoppingCart className="text-black text-xl" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-2">
                {isAuthenticated ? items.length : 0}
              </span>
            </div>
          </>
        ) : null}
        {isSearch === paths.client.index && (
          <div className="flex space-x-3">
            <div
              className="relative flex items-center space-x-2 cursor-pointer py-1 rounded-3xl bg-gray-100 px-3 hover:bg-gray-200 transition-all duration-300 hover:ease-linear"
              onClick={() => {
                router(paths.client.productpage);
              }}
            >
              <HiMiniShoppingBag className="text-black text-xl" />
              <span className="text-lg font-semibold">Products</span>
            </div>
            <div
              className="relative flex items-center space-x-2 cursor-pointer py-1 rounded-3xl bg-gray-100 px-3 hover:bg-gray-200 transition-all duration-300 hover:ease-linear"
              onClick={() => {
                router(paths.client.cart);
              }}
            >
              <FaShoppingCart className="text-black text-xl" />
              <span className="text-lg font-semibold">Cart</span>
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-2">
                {isAuthenticated ? items.length : 0}
              </span>
            </div>
          </div>
        )}
        {isSearch === paths.client.productbyId && (
          <div
            className="relative flex items-center space-x-2 cursor-pointer py-1 rounded-3xl bg-gray-100 px-3 hover:bg-gray-200 transition-all duration-300 hover:ease-linear"
            onClick={() => {
              router(paths.client.cart);
            }}
          >
            <FaShoppingCart className="text-black text-xl" />
            <span className="text-lg font-semibold">Cart</span>
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-2">
              {isAuthenticated ? items.length : 0}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default React.memo(Header);
