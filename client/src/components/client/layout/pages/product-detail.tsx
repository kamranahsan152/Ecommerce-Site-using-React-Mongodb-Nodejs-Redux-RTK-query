import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import Footer from "../sections/footer";
import HeaderTop from "../sections/header-top";
import Header from "../sections/header";
import SectionTitle from "../sections/section-title";
import { paths } from "../../../../paths";
import toast from "react-hot-toast";
import { useProductbyIdQuery } from "../../../../redux/client/userReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { addToCart } from "../../../../redux/client/cartSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [loading, setloading] = useState(true);

  const { data: product } = useProductbyIdQuery({ id });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setloading(true);
    const delay = setTimeout(() => {
      setloading(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, []);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + delta, 1));
  };

  const handleCart = () => {
    dispatch(addToCart(product));
  };
  const router = useNavigate();

  return (
    <div>
      <HeaderTop />
      <Header isSearch={paths.client.productbyId} />
      <SectionTitle title="Product Detail" path="Home | Detail" />
      <div className="max-w-5xl h-[500px] mx-auto py-6 sm:px-6 lg:px-8 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <FaSpinner className="text-blue-500 animate-spin" size={35} />
          </div>
        )}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg flex flex-col md:flex-row relative">
          <div className="p-4 md:w-1/2 flex justify-center">
            {!loading && (
              <img
                className="object-contain h-96 w-96"
                src={product?.Images}
                alt={product?.productName}
              />
            )}
          </div>
          <div className="p-4 md:w-1/2">
            {!loading && (
              <>
                <h2 className="text-3xl font-bold text-gray-900">
                  {product?.productName}
                </h2>
                <p className="mt-2 text-lg text-gray-900">${product?.price}</p>
                <p className="mt-4 text-sm text-gray-600">
                  {product?.description}
                </p>
                <div className="py-2 text-lg font-sans font-semibold text-gray-800">
                  in stock{" "}
                  <span className="text-base font-bold px-2 py-1 text-center bg-blue-500 rounded-2xl text-white">
                    {product?.stock}
                  </span>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="mr-4">Quantity:</span>
                  <button
                    className={`bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-l-lg ${
                      quantity <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-300"
                    } transition-all duration-200 flex items-center justify-center`}
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <FiMinus />
                  </button>
                  <input
                    className="w-12 text-center border border-gray-300 mx-1 rounded-lg shadow-inner"
                    type="text"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-r-lg hover:bg-gray-300 transition-all duration-200 flex items-center justify-center"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => {
                      handleCart();
                      toast.success("Added to cart successfully!");
                    }}
                    className="border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white w-full transform hover:ease-in-out transition-all duration-300"
                  >
                    ADD TO CART
                  </button>
                  <button
                    onClick={() => {
                      router(paths.client.cart);
                    }}
                    className="border border-green-500 text-green-500 font-bold py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white transform hover:ease-in-out transition-all duration-300 w-full"
                  >
                    BUY NOW
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  SKU: {product?._id}
                </p>
                <p className="text-sm text-gray-600">
                  Category: {product?.category}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
