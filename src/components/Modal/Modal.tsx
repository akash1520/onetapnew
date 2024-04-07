import React, { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ensureModalRootExists = () => {
  let modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }
  return modalRoot as HTMLElement;
};

const Modal: FC<{ isOpen: boolean; toggle: () => void; children: ReactNode }> = ({
  isOpen,
  toggle,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handling click outside of modal
  const handleBackdropClick = (event: React.MouseEvent) => {
    // Check if the clicked element is the backdrop; if so, close the modal
    if (event.target === event.currentTarget) {
      toggle();
    }
  };

  if (!isOpen) {
    return null;
  }

  const modalRoot = ensureModalRootExists();

  return ReactDOM.createPortal(
    // Added the onClick handler to the backdrop div
    <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    onClick={toggle}
  >
    <div
      className="bg-[#3D3D3D] p-5 rounded-lg flex flex-col relative"
      onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
    >
      {children}
      <button
        onClick={toggle}
        className="absolute top-0 right-0 m-2 text-2xl font-semibold text-white"
      >
        &times;
      </button>
    </div>
  </div>,
    modalRoot,
  );
};

export default Modal;
