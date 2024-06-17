import React, { useEffect, useState } from "react";
import HeaderTop from "./sections/header-top";
import Header from "./sections/header";
import { paths } from "../../../paths";
import Footer from "./sections/footer";
import ProductSection from "./sections/product-section";
import { FaLongArrowAltRight, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProductsQuery } from "../../../redux/client/userReducer";
const Layout = () => {
  // const [products, setProducts] = useState<any[]>([]);
  const [loading, setloading] = useState(false);

  const { data: products } = useProductsQuery("");

  useEffect(() => {
    setloading(true);
    const delay = setTimeout(() => {
      setloading(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, []);

  const router = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <HeaderTop />
      <Header isSearch={paths.client.index} />
      <div className="flex-1 overflow-auto">
        <div className="bg-blue-500 py-5 flex flex-col items-center justify-center max-lg:h-[900px] max-md:h-[750px]">
          <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10">
            <div className="flex flex-col gap-y-5 max-lg:order-last col-span-2">
              <h1 className="text-6xl text-white font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
                THE PRODUCT OF THE FUTURE
              </h1>
              <p className="text-white max-sm:text-sm text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
                modi iure laudantium necessitatibus ab, voluptates vitae ullam.
                Officia ipsam iusto beatae nesciunt, consequatur deserunt minima
                maiores earum obcaecati. Optio, nam!
              </p>
              <div className="flex gap-x-1 max-lg:flex-col max-lg:gap-y-1">
                <button
                  onClick={() => {
                    router(paths.client.productpage);
                  }}
                  className="bg-white rounded-2xl text-blue-600 font-bold px-12 py-2 max-lg:text-xl max-sm:text-lg hover:bg-gray-100 transform transition-transform duration-300 hover:translate-y-2"
                >
                  BUY NOW
                </button>
                <button className="bg-white rounded-2xl text-blue-600 font-bold px-12 py-2 max-lg:text-xl max-sm:text-lg hover:bg-gray-100 transform transition-transform duration-300 hover:translate-y-2">
                  LEARN MORE
                </button>
              </div>
            </div>
            <div>
              <img
                className="lg:h-full lg:w-full md:h-44 md:w-44"
                src="./watch for banner.png"
                alt="banner"
              />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r border-b-2 from-blue-200 to-blue-400 py-5 flex flex-col items-center justify-center max-lg:h-[900px] max-md:h-[750px]">
          <div className="text-6xl font-bold text-black">
            STORONIC<span className="text-blue-500">SHOP</span>
          </div>
          <div className="font-bold font-sans py-2">
            Buy the latest electronics, here
          </div>
          <div
            onClick={() => {
              router(paths.client.productpage);
            }}
            className="text-xl cursor-pointer hover:outline hover:outline-1 hover:bg-white hover:text-blue-500 bg-blue-500 py-1 px-4 text-white font-semibold rounded-2xl shadow hover:ease-in-out transform transition-all duration-300"
          >
            Shop now
          </div>
        </div>
        <div className="bg-white">
          <div className="text-4xl py-4 font-bold text-black text-center">
            Featured Products
          </div>

          <div className="container mx-auto p-4 lg:w-3/4">
            {loading && (
              <div className="flex items-center justify-center bg-white bg-opacity-40 h-80">
                <FaSpinner className="text-blue-500 animate-spin" size={35} />
              </div>
            )}
            {!loading && (
              <div className="flex flex-wrap -mx-2">
                {products?.slice(0, 3)?.map((product: any, index: any) => (
                  <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                    <ProductSection
                      category={product?.category}
                      id={product?._id}
                      name={product?.productName}
                      price={product?.price}
                      imageUrl={product?.Images}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-2 flex justify-end space-x-3 py-1">
              <button
                onClick={() => {
                  router(paths.client.productpage);
                }}
                className="outline outline-1 flex items-center space-x-2 text-blue-500 hover:bg-blue-700 hover:text-white font-medium py-1 px-4 rounded-lg transform hover:ease-in-out transition-all duration-300"
              >
                <span>See all</span>
                <span>
                  <FaLongArrowAltRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
