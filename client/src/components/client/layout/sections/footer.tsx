import React from "react";
import FooterBottom from "./footer-bottom";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100 border-t-2 border-blue-200 py-8 m-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-evenly">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
            <div className="mb-8 md:mb-0">
              <h1 className="text-2xl font-bold text-black">
                STORONIC<span className="text-blue-500">SHOP</span>
              </h1>
              <span className="text-sm text-gray-500">
                ELECTRONIC ECOMMERCE
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h2 className="font-bold text-blue-500 mb-2">Sale</h2>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-700">
                      Discounts
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700">
                      News
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700">
                      Register Discounts
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-blue-500 mb-2">About Us</h2>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-700">
                      About PhoneShop
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700">
                      Work With Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700">
                      Company Profile
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-blue-500 mb-2">Buying</h2>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-700">
                      PhoneShop Loyalty Card
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700">
                      Terms Of Use
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700">
                      Complaints
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700">
                      Partners
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-bold text-blue-500 mb-2">Support</h2>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-700">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700">
                      How to Buy at PhoneShop
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <FooterBottom />
    </>
  );
};

export default React.memo(Footer);
