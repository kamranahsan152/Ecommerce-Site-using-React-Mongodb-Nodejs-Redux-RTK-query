import React from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  ModelData: any;
  title: string;
}

const ProductModal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  ModelData,
  title,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={closeModal}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <img
              src={`${ModelData.Images}`}
              alt={ModelData.productName}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {ModelData.productName}
            </h3>
            <p className="text-gray-700 mb-4">{ModelData.description}</p>
            {/* <p className="text-gray-800 font-semibold">
              Manufacturer: {ModelData.Manufacturer}
            </p> */}
            {/* <p className="text-gray-800 font-semibold">
              Type: {ModelData.Type}
            </p> */}
            <p className="text-gray-800 font-semibold">
              Category: {ModelData.category}
            </p>
            <p className="text-gray-800 font-semibold">
              Price: Rs {ModelData.price}
            </p>
            <p className="text-gray-800 font-semibold">
              Stock: {ModelData.stock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Set the display name for the component
ProductModal.displayName = "ModalProduct";

export default ProductModal;
