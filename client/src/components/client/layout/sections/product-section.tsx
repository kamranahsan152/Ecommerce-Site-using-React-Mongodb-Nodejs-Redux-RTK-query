import React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../paths";

interface ProductProps {
  id: any;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
}

const ProductSection: React.FC<ProductProps> = ({
  name,
  price,
  imageUrl,
  id,
  category,
}) => {
  const router = useNavigate();
  return (
    <div className="rounded-lg shadow overflow-hidden justify-around flex flex-col h-full transform transition-transform duration-300 hover:translate-y-2">
      <div className="h-48 w-full overflow-hidden py-4">
        <img
          src={imageUrl}
          alt={name}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow items-center">
        <h3 className="text-lg font-bold text-center">{name}</h3>
        <div className="mt-auto w-full px-4">
          <p className="text-gray-800 text-lg text-center">Rs {price}</p>
          <p className="text-center uppercase text-gray-500 font-semibold text-sm">
            {category}
          </p>
          <button
            onClick={() => {
              router(paths.client.productbyId.replace(":id", id));
            }}
            className="mt-4 px-4 py-2 outline  outline-1 hover:bg-blue-500 hover:text-white text-blue-500 rounded-lg w-full transform hover:ease-in-out over:ease-in-ou transition-all duration-300"
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductSection);
