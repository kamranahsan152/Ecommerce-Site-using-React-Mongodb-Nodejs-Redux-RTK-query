import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Footer from "../sections/footer";
import HeaderTop from "../sections/header-top";
import SectionTitle from "../sections/section-title";
import Header from "../sections/header";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../paths";

const CheckoutSuccess: React.FC = () => {
  const router = useNavigate();
  return (
    <div>
      <HeaderTop />
      <Header />
      <SectionTitle title="Order Success" path="Home | Success" />
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 text-center">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h3 className="text-2xl leading-6 font-medium text-gray-900">
              Ordered Successfully!
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>
            <div className="mt-2">
              <button
                onClick={() => {
                  router(paths.client.productpage);
                }}
                className="mt-4 px-4 py-2 outline  outline-1 hover:bg-blue-500 hover:text-white text-blue-500 rounded-lg transform hover:ease-in-out transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
