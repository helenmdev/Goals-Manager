import React from "react";
import { Link, useParams } from "react-router-dom";
import "../../StyleSheets/Modal.css";

const ModalCreate = ({ yesbtn, confirmdelete, nodelete }) => {
  const { id } = useParams();

  return (
    <div className="create-popup card">
      {!id ? (
        <div>
          <b>Goal created</b>, Do you want to create another goal?'
        </div>
      ) : (
        <div>Do you want to delete this goal?</div>
      )}

      {!id ? (
        <div className="modal-btns">
          <button className="modal-btn" onClick={yesbtn}>
            Yes
          </button>
          <Link to="/list">
            <button className="modal-btn">No</button>
          </Link>
        </div>
      ) : (
        <div className="modal-btns">
          <button className="modal-btn" onClick={confirmdelete}>
            Yes
          </button>
            <button className="modal-btn" onClick={nodelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default ModalCreate;
