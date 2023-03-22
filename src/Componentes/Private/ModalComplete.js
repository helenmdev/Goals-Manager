import React from "react";
import "../StyleSheets/Modal.css";

const ModalComplete = ({ ok }) => {
  return (
    <div className="delete-popup card">
      <div className="goalcomplete">Great! you have completed this goal</div>
      <small>
        If you want to keep working on this goal, please update it on the
        updating box
      </small>
      <div className="modal-btns">
        <div className="modal-btn" onClick={ok}>
          ok
        </div>
      </div>
    </div>
  );
};

export default ModalComplete;
