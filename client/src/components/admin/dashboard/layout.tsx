import React, { useState } from "react";
import Products from "./sections/products";
import Users from "./sections/users";
import Orders from "./sections/orders";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

const DashboardLayout: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Products");

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Products":
        return <Products />;
      case "Users":
        return <Users />;
      case "Orders":
        return <Orders />;
      default:
        return <Products />;
    }
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow">{renderTabContent()}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
