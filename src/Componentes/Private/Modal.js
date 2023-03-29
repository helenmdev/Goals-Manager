import React from "react";
import "../../StyleSheets/Modal.css";

const Modal = ({ showModal, children }) => {
  return (
    <div className="modal-box">
      <div className="blurry-bg"></div>
        <div className="creation-modal">{children}
      </div>
    </div>
  );
};

export default Modal;
