import React, { useState } from "react";
import Footer from "../sections/footer";
import HeaderTop from "../sections/header-top";
import SectionTitle from "../sections/section-title";
import Header from "../sections/header";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../paths";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import {
  clearCart,
  removeItemFromCart,
  removeSingleItem,
  updateCartItemQuantity,
} from "../../../../redux/client/cartSlice";
import toast from "react-hot-toast";
import { useOrderMutation } from "../../../../redux/client/userReducer";

const ShoppingCart: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const [placeOrder] = useOrderMutation();
  const dispatch = useDispatch<AppDispatch>();
  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.sum, 0);
  };

  const handleQuantityChange = (id: number, delta: number) => {
    const item = items.find((item) => item._id === id);
    if (item) {
      const newQty = item.qty + delta;
      if (newQty > item.stock) {
        toast.error("You've reached the maximum stock limit for this item!");
        return;
      }
      if (newQty < 1) {
        dispatch(removeSingleItem(item));
      } else if (newQty <= 5) {
        dispatch(updateCartItemQuantity({ _id: id, qty: newQty }));
      } else {
        toast.error("You've reached the maximum limit of 5 items per product!");
      }
    }
  };

  const handleRemoveItemFromCart = (item: any) => {
    dispatch(removeItemFromCart(item));
  };

  const shippingEstimate = 5.0;
  const taxEstimate = 44;

  const subtotal = calculateSubtotal();
  const orderTotal =
    items.length > 0 ? subtotal + shippingEstimate + taxEstimate : 0;

  const router = useNavigate();

  const handleCheckOut = async (item: any) => {
    const orderItems = item.map((item: any) => ({
      productName: item.productName,
      price: item.price,
      qty: item.qty,
      Images: item.Images,
      product: item._id,
    }));
    const body = {
      orderItems: orderItems,
      shippingPrice: shippingEstimate,
      totalPrice: orderTotal,
    };

    try {
      const response = await placeOrder(body).unwrap();
      toast.success(response.msg);
      router(paths.client.success);
      dispatch(clearCart());
    } catch (error: any) {
      toast.error(error.data.msg);
    }
  };

  return (
    <div>
      <HeaderTop />
      <Header />
      <SectionTitle title="Cart Page" path="Home | Cart" />
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Shopping Cart
            </h3>
          </div>
          <div className="border-t border-gray-200 ">
            {items?.map((item, index) => (
              <div
                key={index}
                className={`px-6 py-5 relative flex items-center md:justify-around sm:justify-between sm:px-1 border-b`}
              >
                <div
                  onClick={() => {
                    handleRemoveItemFromCart(item);
                  }}
                  className="absolute h-10 w-10 right-0 top-0 py-3 cursor-pointer"
                >
                  <IoIosCloseCircle size={22} className="text-blue-500" />
                </div>
                <div className="text-sm font-medium text-gray-600 flex items-center">
                  <div className="flex items-center">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        className="h-full w-full object-contain"
                        src={item?.Images}
                        alt={"image"}
                      />
                    </div>
                    <div className="flex flex-col ml-4">
                      <span className="text-black text-justify w-[300px]">
                        {item?.productName}
                      </span>
                      <span className="text-sm">{item?.category}</span>
                      <div className="py-2 font-sans text-lg text-gray-800">
                        Rs {item?.price}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex items-center">
                  <button
                    className={`bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-l-lg ${
                      item.qty <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-300"
                    } transition-all duration-200 flex items-center justify-center`}
                    onClick={() => handleQuantityChange(item._id, -1)}
                    disabled={item.qty <= 1}
                  >
                    <FiMinus />
                  </button>
                  <input
                    className="w-12 text-center border py-1 border-gray-300 mx-1 rounded-lg shadow-inner"
                    type="text"
                    value={item.qty}
                    readOnly
                  />
                  <button
                    className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-r-lg hover:bg-gray-300 transition-all duration-200 flex items-center justify-center"
                    onClick={() => handleQuantityChange(item._id, 1)}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            ))}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 lg:flex lg:justify-between border-t">
              <dt className="text-sm font-medium text-gray-500">
                Order summary
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex justify-between lg:w-[300px]">
                  <span>Subtotal</span>
                  <span>Rs {subtotal}</span>
                </div>
                <div className="flex justify-between mt-3">
                  <span className="antialiased">Shipping estimate</span>
                  <span>Rs {shippingEstimate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-3">
                  <span>Tax estimate</span>
                  <span>Rs {taxEstimate}</span>
                </div>
                <div className="flex justify-between mt-3 font-bold text-base">
                  <span>Order total</span>
                  <span>Rs {orderTotal}</span>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      handleCheckOut(items);
                    }}
                    className="mt-4 px-4 py-2 outline outline-1 hover:bg-blue-500 hover:text-white text-blue-500 rounded-lg w-full transition-all duration-300"
                  >
                    Checkout
                  </button>
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
