import React from "react";
import Styles from "./Modal.module.css";

interface ModalProps {
  showModal: Boolean;
  children: React.ReactNode;
  cleanModal: any;
}

const Modal = ({ children, cleanModal }: ModalProps) => {
  return (
    <>
      <div className={Styles.modalBox}>
        <div className={Styles.blurryBg} onClick={cleanModal}></div>
        <div className={Styles.creationModal}>{children}</div>
      </div>
    </>
  );
};

export default Modal;
