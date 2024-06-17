import React, { useState } from "react";
import { IoIosCheckmarkCircle, IoMdAlert } from "react-icons/io";
import Modal from "../modals/modal";
import { Order } from "../../../../types/order";
import {
  useAllordersQuery,
  useUpdateOrderMutation,
} from "../../../../redux/reducer";
import toast from "react-hot-toast";
import moment from "moment";
const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [acceptOrder] = useUpdateOrderMutation();

  const { isLoading, isSuccess, data, refetch } = useAllordersQuery("");
  console.log(data);

  const changeStatusToDelivered = async (id: string) => {
    console.log(id);

    const orderfind = data?.map((order: any) => order._id === id);
    console.log(orderfind);
    if (orderfind) {
      try {
        const response = await acceptOrder({
          id,
          orderStatus: "Delivered",
        }).unwrap();
        console.log(response.msg);
        refetch();
        toast.success(response.msg);
      } catch (error: any) {
        toast.error(error.data.msg);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const filteredOrders: Order[] =
    isSuccess &&
    data.filter((order: Order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="overflow-x-auto m-3">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200 font-sans">
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Order Date</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">OrderItems</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-100 transition-colors text-center"
              >
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.user}</td>
                <td className="border px-4 py-2">
                  {moment(order.orderAt).format("YYYY-MM-DD HH:mm:ss")}
                </td>
                <td className="border px-4 py-2">{order.totalPrice}</td>
                <td className="border px-4 py-2">{order.orderStatus}</td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center">
                    <div
                      onClick={openModal}
                      className="bg-blue-500 hover:bg-blue-700 rounded-xl font-sans w-28 text-base cursor-pointer p-1 text-white"
                    >
                      View Items
                    </div>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  {order.orderStatus === "Pending" ? (
                    <button
                      onClick={() => changeStatusToDelivered(order._id)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-xl"
                    >
                      Mark as Delivered
                    </button>
                  ) : (
                    <div className="flex justify-center">
                      <IoIosCheckmarkCircle
                        className="text-green-500"
                        size={30}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="border px-4 py-4 text-center">
                <div className="flex justify-center items-center h-full">
                  <IoMdAlert size={30} className="text-blue-500 mr-2" /> No data
                  existed!
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        isOpen={modalOpen}
        closeModal={closeModal}
        title="orders"
        ModelData={null}
      />
    </div>
  );
};

export default Orders;
