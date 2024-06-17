import React, { useEffect, useState } from "react";
import ProductSection from "./product-section";
import { FaSpinner } from "react-icons/fa";
import { useProductsQuery } from "../../../../redux/client/userReducer";

const productsPerPage = 6; // Number of products to display per page

const ProductItem = ({ searchValue }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setloading] = useState(false);

  const { data: productsapi, isSuccess } = useProductsQuery("");

  useEffect(() => {
    setloading(true);
    const delay = setTimeout(() => {
      setloading(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, [currentPage]);

  // Calculate indexes for pagination
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts =
    productsapi && productsapi.slice(firstIndex, lastIndex);

  // Function to handle pagination
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="container mx-auto p-4 lg:w-3/4 min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-40 z-10 backdrop-filter backdrop-blur-sm">
          <FaSpinner className="text-blue-500 animate-spin" size={35} />
        </div>
      )}
      <div className="flex flex-wrap -mx-2">
        {currentProducts
          ?.filter((item: any) => {
            return item.productName
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
          .map((product: any, index: any) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
              <ProductSection
                id={product?._id}
                name={product?.productName}
                price={product?.price}
                imageUrl={product?.Images}
                category={product?.category}
              />
            </div>
          ))}
      </div>
      <div className="mt-4 flex justify-end space-x-3 py-3">
        <button
          className={`outline outline-1 text-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded-lg transform hover:ease-in-out transition-all duration-300 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className={`outline outline-1 text-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded-lg transform hover:ease-in-out transition-all duration-300 ${
            lastIndex >= productsapi?.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handleNextPage}
          disabled={lastIndex >= productsapi?.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductItem);
