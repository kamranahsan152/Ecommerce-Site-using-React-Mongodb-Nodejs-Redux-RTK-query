import React, { useState } from "react";
import {
  useAllproductsQuery,
  useUpdateProductMutation,
} from "../../../../redux/reducer";
import toast from "react-hot-toast";
import { paths } from "../../../../paths";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  ModelData: any;
  title: string;
}

const EditModal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  ModelData,
  title,
}) => {
  const [formData, setFormData] = useState(ModelData);
  const [file, setFile] = useState<File | null>(null);

  const newFormData = new FormData();

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const { refetch } = useAllproductsQuery("");
  const [updateProduct] = useUpdateProductMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    newFormData.append("productName", formData.productName);
    // newFormData.append("Manufacturer", formData.Manufacturer);
    // newFormData.append("Type", formData.Type);
    newFormData.append("description", formData.description);
    newFormData.append("price", formData.price);
    newFormData.append("stock", formData.stock);
    newFormData.append("category", formData.category);
    if (file) {
      newFormData.append("image", file);
    }

    try {
      const id = ModelData._id;
      const response = await updateProduct({ body: newFormData, id }).unwrap();
      toast.success(response.msg);
      refetch();
    } catch (error: any) {
      toast.error(error.msg);
    }
    closeModal();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={closeModal}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            {/* {imagePreview ? (
              <img
                src={imagePreview}
                alt={formData.productName}
                className="w-32 h-32 object-cover rounded-lg mb-4"
              />
            ) : (
              <img
                src={`http://localhost:5000/${ModelData.Images}`}
                alt={ModelData.productName}
                className="w-32 h-32 object-cover rounded-lg mb-4"
              />
            )} */}
            <label className="block text-gray-700 mb-2">Change Image</label>
            <div>
              <input
                type="file"
                name="image"
                accept="image/*"
                id="file-input"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={(e: any) => handleChange(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* <div>
              <label className="block text-gray-700 mb-2">Manufacturer</label>
              <input
                type="text"
                name="Manufacturer"
                value={formData.Manufacturer}
                onChange={(e: any) => handleChange(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div> */}
            {/* <div>
              <label className="block text-gray-700 mb-2">Type</label>
              <input
                type="text"
                name="Type"
                value={formData.Type}
                onChange={(e: any) => handleChange(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div> */}
            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={(e: any) => handleChange(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e: any) => handleChange(e)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              rows={3}
            ></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={(e: any) => handleChange(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={(e: any) => handleChange(e)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Set the display name for the component
EditModal.displayName = "EditModal";

export default EditModal;
