import React, { createContext, useState } from "react";

export const ShowModalContext = createContext();

export const ShowModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  return (
    <ShowModalContext.Provider
      value={{ showModal, setShowModal, modalContent, setModalContent }}
    >
      {children}
    </ShowModalContext.Provider>
  );
};
export default ShowModalProvider;
