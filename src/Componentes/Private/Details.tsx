import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { setUpNotifications } from "reapop";
import moment from "moment-timezone";
import { useNotifications } from "reapop";
import { ContextGoals } from "../../Services/Memory/Goals";
import icons from "../../Objects/Icons";
import Modal from "./Modal";
import {
  createGoal,
  updateGoal,
  deleteGoal,
} from "../../Services/GoalsRequests";
import { FormsVerify } from "../../Services/FormsVerify";
import Styles from "./Details.module.css";
import { ContextAuth } from "../../Services/Memory/Autheentication";
import getData from "../../Services/getData";
import { ShowModalContext } from "../../Services/Memory/ShowModal";
import { userToken, userName } from "../../Services/Memory/userData";
import useGetGoals from "../../Hooks/useGetGoals";

interface Form {
  details: string;
  goal: number;
  duedate: string;
  complete: number;
  icon: string;
  completecheck: boolean;
  events: number;
  frequency: string;
}

const Details = ({}) => {
  const [auth, dispatchAuth] = useContext(ContextAuth);
  const [state, dispatch] = useContext(ContextGoals);
  const { setShowModal, showModal } = useContext(ShowModalContext);

  const token = userToken();
  const user = userName();

  useGetGoals(token);

  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
      dismissAfter: 5000,
    },
  });

  const { notify } = useNotifications();

  const { id } = useParams();

  const navigate = useNavigate();

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("Other goal");

  const [form, setForm] = useState<Form>({
    details: "",
    goal: 1,
    duedate: new Date().toISOString(),
    complete: 0,
    icon: "Other goal",
    completecheck: true,
    events: 1,
    frequency: "Day",
  });

  const memoryid = state.objects ? state.objects[id] : null;

  const { allconditions, condition1, condition2, condition3 } =
    FormsVerify(form);

  useEffect(() => {
    if (!id) return;
    if (!memoryid) {
      return navigate("/list");
    }
    setForm(memoryid);
  }, [id, navigate, memoryid, auth]);

  const { details, frequency, events, icon, goal, complete } = form;

  const frequencies = ["Day", "Week", "Month", "Year", "Lifetime"];

  const formattedDate = moment(form.duedate).format("YYYY-MM-DD");

  const onChange = (event, prop) => {
    if (prop === "icon") {
      setSelectedIcon(event.target.value);
    }
    setForm((state) => ({ ...state, [prop]: event.target.value }));
  };

  const VerifyForms = (form) => {
    if (!condition1) {
      notify("Duedate must be in the future", "error");
    }
    if (!condition2) {
      notify("The goal number must be greater than complete number", "error");
    }
    if (!condition3) {
      notify("Details cannot be empty", "error");
    }
  };

  const yesbtn = () => {
    navigate("/new");
    setSelectedIcon("Other goal");
    setShowModalConfirm(false);
    setForm({
      details: "",
      goal: 1,
      duedate: new Date().toISOString(),
      complete: 0,
      icon: "Other goal",
      completecheck: true,
      events: 1,
      frequency: "Day",
    });
  };

  const handleUnauthorized = () => {
    dispatchAuth({ type: "logout" });
    localStorage.removeItem("token");
    navigate("/login");
    notify("Unauthorized user, please log in again", "error");
  };

  const cancelDeleteBtn = () => {
    setShowModalConfirm(false);
  };

  const cancelbtn = () => {
    setShowModal(false);
    navigate("/list");
  };

  const create = async () => {
    try {
      VerifyForms(form);
      if (allconditions) {
        try {
          const goal = await createGoal(form, token);
          dispatch({ type: "create", goal });
          setShowModalConfirm(true);
        } catch (error) {
          if (error.message === "UnauthorizedError") {
            handleUnauthorized();
          }
        }
      }
    } catch (error) {
      handleUnauthorized();
    }
  };

  const update = async () => {
    try {
      VerifyForms(form);
      if (allconditions) {
        if (form.complete === form.goal) {
          form.completecheck = false;
        } else {
          form.completecheck = true;
        }
        try {
          const goalupdated = await updateGoal(form, token);
          dispatch({ type: "update", goalupdated });
          navigate("/list");
          getData(token, dispatch);
        } catch (error) {
          if (error.message === "UnauthorizedError") {
            handleUnauthorized();
          }
        }
      }
    } catch (error) {
      handleUnauthorized();
    }
  };

  const deletebtn = () => {
    setShowModalConfirm(!showModalConfirm);
  };

  const confirmdelete = async () => {
    try {
      await deleteGoal(form.id, token);
      dispatch({ type: "delete", id: form.id });
      navigate("/list");
      await getData(token, dispatch);
    } catch (error) {
      if (error.message === "UnauthorizedError") {
        handleUnauthorized();
      }
    }
  };

  return (
    <>
      <div className={Styles.detailsbox}>
        <div className={Styles.formCard}>
          <form className={Styles.detailsForm}>
            <label>
              Describe your goal
              <input
                className={Styles.input}
                placeholder="Ej. run 5K"
                value={details}
                onChange={(e) => onChange(e, "details")}
              ></input>
            </label>

            <label>
              How often do you want to achieve your goal?
              <span className={Styles.detailExplain}> Ej. 3 per week</span>
              <div
                className={`${Styles.formInputs} ${Styles.formInputFrequency}`}
              >
                <input
                  type="number"
                  className={`${Styles.input} ${Styles.formInputFrequency}`}
                  placeholder="1"
                  value={events}
                  onChange={(e) => onChange(e, "events")}
                ></input>
                <select
                  placeholder="Ej. Day"
                  className={`${Styles.input} ${Styles.formInputFrequency}`}
                  value={frequency}
                  onChange={(e) => onChange(e, "frequency")}
                >
                  {frequencies.map((freq, index) => (
                    <option
                      key={index}
                      className={`${Styles.input} ${Styles.formInputFrequency}`}
                      value={freq}
                    >
                      per {freq}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label>
              How many times do you want to achieve this goal?
              <input
                type="number"
                className={Styles.input}
                placeholder="1"
                value={goal}
                onChange={(e) => onChange(e, "goal")}
              ></input>
            </label>

            <label>
              Does it has a due date?
              <input
                type="date"
                className={Styles.input}
                placeholder="Ej. run 5K"
                value={formattedDate}
                onChange={(e) => onChange(e, "duedate")}
              />
            </label>

            <label>
              How many times have you completed this goal?
              <input
                type="number"
                className={Styles.input}
                placeholder="1"
                value={complete}
                onChange={(e) => onChange(e, "complete")}
              ></input>
            </label>

            <label>
              Choose an icon for your goal
              <div className={Styles.formIconSelect}>
                <div className={Styles.iconSelected}>
                  <img alt="goal type icon" src={icons[selectedIcon]} />
                </div>
                <select
                  placeholder="Ej. Day"
                  className={Styles.input}
                  onChange={(e) => onChange(e, "icon")}
                  value={icon}
                >
                  {Object.keys(icons).map((icon, index) => (
                    <option key={index} className={Styles.input} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </form>
          <div className={Styles.detailBtnBox}>
            {id ? (
              <div className={Styles.detailBtn} onClick={update}>
                Update
              </div>
            ) : (
              <div className={Styles.detailBtn} onClick={create}>
                Create
              </div>
            )}

            {id && (
              <div className={Styles.detailBtn} onClick={deletebtn}>
                Delete
              </div>
            )}
            {showModalConfirm && (
              <Modal showModal={cancelbtn}>
                {!id ? (
                  <div className={`${Styles.createPopup} ${Styles.card}`}>
                    <div>
                      <b>Goal created</b>, Do you want to create another goal?
                    </div>
                    <div className={Styles.modalBtns}>
                      <button className={Styles.modalBtn} onClick={yesbtn}>
                        Yes
                      </button>
                      <button className={Styles.modalBtn} onClick={cancelbtn}>
                        No
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`${Styles.createPopup} ${Styles.card}`}>
                    <div>Do you want to delete this goal?</div>

                    <div className={Styles.modalBtns}>
                      <button
                        className={Styles.modalBtn}
                        onClick={confirmdelete}
                      >
                        Yes
                      </button>
                      <Link to="/list">
                        <button
                          className={Styles.modalBtn}
                          onClick={cancelDeleteBtn}
                        >
                          No
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </Modal>
            )}
            <div className={Styles.detailBtn} onClick={cancelbtn}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
