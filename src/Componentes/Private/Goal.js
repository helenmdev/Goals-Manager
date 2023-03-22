import React from "react";
import "../StyleSheets/Goal.css";
import icons from "../Objects/Icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../Services/Memory";
import Modal from "./Modal";
import ModalComplete from "./ModalComplete";

import Check from "../Images/check.png";
import { updateGoal } from "../Services/Requests";

const Goal = ({ id, details, frequency, events, icon, goal, complete }) => {
  const navegate = useNavigate();

  const [completemodal, setCompleteModal] = useState(false);

  const [state, dispatch] = useContext(Context);

  let completecheck = state.objects[id].completecheck;

  const completegoal = async (e) => {
    e.stopPropagation();

    const updateGoalRequest = async () => {
      const completeUpdate = await updateGoal(goal);
      dispatch({ type: "update", goal: completeUpdate });
    };

    const goal = state.objects[id];
    goal.complete++;

    if (goal.goal <= goal.complete) {
      goal.completecheck = false;
      goal.complete = goal.goal;
      updateGoalRequest();
      setCompleteModal(!completemodal);
      return;
    } else {
      updateGoalRequest();
      return;
    }
  };

  const opengoal = (e) => {
    e.stopPropagation();
    navegate(`/list/${id}`);
  };

  const ok = (e) => {
    navegate("/list");
    setCompleteModal(false);
  };

  return (
    <>
      <div
        className={!completecheck ? "goal-card-done card" : "goal-card card"}
        id="goalcard"
        onClick={opengoal}
        style={{ minWidth: 0 }}
      >
        <div className="goal-description" style={{ minWidth: 0 }}>
          <div className="goal-icon" style={{ minWidth: 0 }}>
            <img
              className="goal-icon-img"
              alt="goal icon"
              src={
                !completecheck
                  ? Check
                  : icons[icon]
                  ? icons[icon]
                  : icons["Other goal"]
              }
            ></img>
          </div>
          <div style={{ minWidth: 0 }} className="frequency-box">
            <p className="goal-frequency" style={{ minWidth: 0 }}>
              {events}
              <sub className="sub" style={{ minWidth: 0 }}>
                /{frequency}
              </sub>
            </p>
          </div>
          <p className="goal-description-detail">{details}</p>
        </div>

        <div className="goal-progress">
          <div className="goal-progress-box">
            <p>
              {complete} de {goal}
            </p>
            <div>
              <div className="goal-bar">
                <div
                  className={
                    !completecheck
                      ? "goal-progress-bar-done"
                      : "goal-progress-bar"
                  }
                  style={{ width: `${Math.round((complete / goal) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
          <button className="goal-complete-btn" onClick={completegoal}>
            Completado
          </button>
        </div>
      </div>
      {completemodal ? (
        <Modal>
          <ModalComplete ok={ok} />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default Goal;
