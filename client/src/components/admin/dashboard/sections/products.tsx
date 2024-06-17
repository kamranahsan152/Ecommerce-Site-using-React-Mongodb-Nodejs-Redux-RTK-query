import React, { useState } from "react";
import {
  useAllproductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../../../redux/reducer";
import ProductModal from "../modals/productModal";
import EditModal from "../modals/edit-modal";
import { Product } from "../../../../types/product";
import { IoMdAlert } from "react-icons/io";
import Pagination from "../pagination/pagination";
import toast from "react-hot-toast";
import { FaPen, FaTrash } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import AddProductModal from "../modals/add-modal";
import numeral from "numeral";

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [modelData, setModelData] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);
  const detailModal = () => setDetailModalOpen(true);
  const detailCloseModal = () => setDetailModalOpen(false);

  const { isLoading, isSuccess, data, refetch } = useAllproductsQuery("");

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleDelete = async (id: any) => {
    try {
      const response = await deleteProduct({ id }).unwrap();
      toast.success(response.msg);
      refetch();
    } catch (error: any) {
      toast.error(error.msg);
    }
  };

  const handleUpdate = async (id: any, updatedData: any) => {
    try {
      const response = await updateProduct({ id, ...updatedData }).unwrap();
      toast.success(response.msg);
      refetch();
    } catch (error: any) {
      toast.error(error.msg);
    }
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const filteredProducts: Product[] = isSuccess
    ? data.filter((product: any) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-x-auto m-2">
      <div className="flex mb-4 justify-between w-full">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={openModal}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-sans py-1 px-4 rounded-xl"
        >
          <div className="flex items-center space-x-2 justify-center">
            <IoMdAddCircle size={20} />{" "}
            <span className="text-base font-sans font-bold">Add Product</span>
          </div>
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200 font-sans">
          <tr>
            <th className="sticky left-0 bg-gray-200 z-10 w-1/12 px-4 py-2 text-left">
              Images
            </th>
            <th className="sticky left-12 bg-gray-200 z-10 w-2/12 px-4 py-2 text-left">
              Product Name
            </th>
            <th className="sticky left-36 bg-gray-200 z-10 w-2/12 px-4 py-2 text-left">
              Category
            </th>
            <th className="w-2/12 px-4 py-2 text-left">Price</th>
            <th className="w-1/12 px-4 py-2 text-left">Stock</th>
            <th className="sticky right-0 bg-gray-200 z-10 w-1/12 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="sticky left-0 z-10 w-1/12 px-4 py-2 whitespace-nowrap">
                  <img
                    src={`${product.Images}`}
                    alt="src"
                    width={100}
                    height={100}
                  />
                </td>
                <td className="sticky left-12  z-10 w-2/12 px-4 py-2 whitespace-nowrap">
                  {product.productName}
                </td>
                <td className="sticky left-36  z-10 w-2/12 px-4 py-2 whitespace-nowrap">
                  {product.category}
                </td>
                <td className="w-2/12 px-4 py-2 whitespace-nowrap">
                  Rs {numeral(product.price).format(`0,0.0`)}
                </td>
                <td className="w-1/12 px-4 py-2 whitespace-nowrap">
                  {product.stock}
                </td>
                <td className="sticky right-0 z-10 w-1/12 px-4 py-2 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => {
                      openEditModal();
                      setModelData(product);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-sans py-1 px-4 rounded-xl"
                  >
                    <FaPen size={20} />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(product._id);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-sans py-1 px-4 rounded-xl"
                  >
                    <FaTrash size={20} />
                  </button>
                  <button
                    onClick={() => {
                      detailModal();
                      setModelData(product);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-sans py-1 px-4 rounded-xl"
                  >
                    <BiSolidMessageSquareDetail size={20} />
                  </button>
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
      {modelData && (
        <>
          <ProductModal
            isOpen={detailModalOpen}
            closeModal={detailCloseModal}
            ModelData={modelData}
            title={"Product Details"}
          />
          <EditModal
            isOpen={editModalOpen}
            closeModal={closeEditModal}
            ModelData={modelData}
            title={"Edit Product"}
          />
        </>
      )}

      <AddProductModal
        isOpen={modalOpen}
        closeModal={closeModal}
        title="Add Product"
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Products;
