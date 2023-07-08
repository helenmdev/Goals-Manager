import React from "react";
import Styles from "./Goal.module.css";
import icons from "../../Objects/Icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ContextGoals } from "../../Services/Memory/Goals";
import Modal from "./Modal.tsx";
import Check from "../../Images/check.png";
import { updateGoal } from "../../Services/GoalsRequests";
import { GoalType } from "../../Types/GoalType";
import { userToken, userName, userId } from "../../Services/Memory/userData";

interface GoalProps extends GoalType {}

const Goal = ({
  id,
  details,
  frequency,
  events,
  icon,
  goal,
  complete,
}: GoalProps) => {
  const navegate = useNavigate();

  const [completemodal, setCompleteModal] = useState(false);
  const [state, dispatch] = useContext(ContextGoals);

  const token = userToken();

  let completecheck = state.objects[id].completecheck;

  const completegoal = async (e) => {
    e.stopPropagation();

    const updateGoalRequest = async () => {
      const completeUpdate = await updateGoal(goal, token);
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
        className={
          !completecheck
            ? `${Styles.goalCardDone} ${Styles.card}`
            : `${Styles.goalCard} ${Styles.card}`
        }
        id="goalcard"
        onClick={opengoal}
        style={{ minWidth: 0 }}
      >
        <div className={Styles.goalDescription} style={{ minWidth: 0 }}>
          <div className={Styles.goalIcon} style={{ minWidth: 0 }}>
            <img
              className={`${Styles.goalIcon} ${Styles.img}`}
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
          <div style={{ minWidth: 0 }} className={Styles.frequencyBox}>
            <p className={Styles.goalFrequency} style={{ minWidth: 0 }}>
              {events}
              <sub className={Styles.sub} style={{ minWidth: 0 }}>
                /{frequency}
              </sub>
            </p>
          </div>
          <p className={Styles.goalDescriptionDetail}>{details}</p>
        </div>

        <div className={Styles.goalProgress}>
          <div className={Styles.goalProgressBox}>
            <p>
              {complete} de {goal}
            </p>
            <div>
              <div className={Styles.goalBar}>
                <div
                  className={
                    !completecheck
                      ? Styles.goalProgressBarDone
                      : Styles.goalProgressBar
                  }
                  style={{ width: `${Math.round((complete / goal) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
          {completecheck ? (
            <button className={Styles.goalCompleteBtn} onClick={completegoal}>
              Complete
            </button>
          ) : (
            <div className={Styles.sub} onClick={completegoal}>
              Goal Completed!
            </div>
          )}
        </div>
      </div>

      {completemodal ? (
        <Modal showModal={ok} cleanModal={ok}>
          <div className={Styles.completePopupCard}>
            <div className={Styles.goalComplete}>
              Great! you have completed this goal
            </div>
            <small>
              If you want to keep working on this goal, please update it on the
              updating box
            </small>
            <div className={Styles.modalBtns}>
              <div className={Styles.modalBtn} onClick={ok}>
                ok
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default Goal;
