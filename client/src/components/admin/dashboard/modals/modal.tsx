import React from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  ModelData: any;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  ModelData,
  title,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <button
          onClick={closeModal}
          className="px-3 py-1 bg-blue-500 text-white rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Set the display name for the component
Modal.displayName = "Modal";

export default Modal;
