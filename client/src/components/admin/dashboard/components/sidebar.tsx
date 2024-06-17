import React from "react";
import { FaBox, FaUsers, FaShoppingCart } from "react-icons/fa";

interface SidebarProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTab, setSelectedTab }) => {
  const getMenuItemClass = (tab: string) =>
    `flex items-center text-lg rounded-xl px-3 py-4 ${
      selectedTab === tab ? "bg-gray-700 text-white" : "hover:text-gray-300"
    }`;

  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
        <ul className="p-4">
          <li className={`${getMenuItemClass("Products")} mb-2`}>
            <button onClick={() => setSelectedTab("Products")}>
              <div className="flex justify-center items-center">
                <FaBox className="mr-3" />
                <div>Products</div>
              </div>
            </button>
          </li>
          <li className={`${getMenuItemClass("Users")} mb-2`}>
            <button onClick={() => setSelectedTab("Users")}>
              <div className="flex justify-center items-center">
                <FaUsers className="mr-3" />
                <div>User</div>
              </div>
            </button>
          </li>
          <li className={`${getMenuItemClass("Orders")} mb-2`}>
            <button onClick={() => setSelectedTab("Orders")}>
              <div className="flex justify-center items-center">
                <FaShoppingCart className="mr-3" />
                <div>Orders</div>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
