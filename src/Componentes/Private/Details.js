import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setUpNotifications } from "reapop";
import moment from "moment-timezone";
import { Context } from "../Services/Memory";
import { useNotifications } from "reapop";
import icons from "../Objects/Icons";
import Modal from "./Modal";
import ModalCreate from "./ModalCreate";
import { createGoal, updateGoal, deleteGoal } from "../Services/Requests";
import "../StyleSheets/Details.css";
import "../StyleSheets/Goal.css";
import { Verify } from '../Services/Verify';

const Details = ({ fetchData }) => {

  const [state, dispatch] = useContext(Context);

  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
      dismissAfter: 5000,
    },
  });

  const { notify } = useNotifications();

  const { id } = useParams();

  const navegate = useNavigate("");

  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("Other goal");

  const [form, setForm] = useState({
    details: "",
    goal: 1,
    duedate: new Date().toISOString(),
    complete: 0,
    icon: icons["Other goal"],
    completecheck: true,
    events: 1,
    frequency: "Day",
  });

  const memoryid = state.objects[id];

  const { allconditions, condition1, condition2, condition3 } = Verify(form);

  useEffect(() => {
    if (!id) return;
    if (!memoryid) {
      return navegate("/notfound");
    }
    setForm(memoryid);
  }, [id, navegate, memoryid]);

  const { details, frequency, events, icon, goal,  complete } = form;

  const frequencies = ["Day", "Week", "Month", "Year", "Lifetime"];

  const formattedDate = moment(form.duedate).format("YYYY-MM-DD");

  const onChange = (event, prop) => {
    if (prop === "icon") {
      setSelectedIcon(event.target.value);
    }
    setForm((state) => ({ ...state, [prop]: event.target.value }));
  };

 const validateForm =()=> {
  if(!condition1){
    notify("Duedate must be in the future","error")
  }
  if(!condition2){
    notify("The goal number must be greater than complete number","error")
  }
  if(!condition3){
    notify("Details cannot be empty","error")
  }
 }

  const create = async () => {
        try {
         validateForm(form)
        if (allconditions) {
        const createdGoal = await createGoal(form);
        dispatch({ type: "create", goal: createdGoal });
        setShowModal(!showModal);
      }
      return;
    } catch (error) {
      console.error("Error when creating the goal",error.message);
    }
  };

  const newgoalbtn = () => {
    navegate("/new");
    setSelectedIcon("Other goal");
    setShowModal(!showModal);
    setForm({
      details: "",
      goal: 1,
      duedate: new Date().toISOString(),
      complete: 0,
      icon: icons["Other goal"],
      completecheck: true,
      events: 1,
      frequency: "Day",
    });
  };

  const update = async () => {
    try {
      validateForm(form)
     if (allconditions) {
        if (form.complete === form.goal) {
          form.completecheck = false;
        } else {
          form.completecheck = true;
        }
        const goalupdated = await updateGoal(form);
        dispatch({ type: "update", goalupdated });
        navegate("/list");
        fetchData();
      }
    } catch (error) {
      console.error("Error when creating the goal",error.message);
    }
  };

  const deletebtn = () => {
    setShowModalConfirm(!showModalConfirm);
  };

  const confirmdelete = async () => {
    await deleteGoal(form.id);
    dispatch({ type: "delete", id: form.id });
    navegate("/list");
    fetchData();
  };

  return (
    <div className="form-card card">
      <form className="details-form">
        <label className="form-inputs">
          Describe your goal
          <input
            className="input"
            placeholder="Ej. run 5K"
            value={details}
            onChange={(e) => onChange(e, "details")}
          ></input>
        </label>

        <label>
          How often do you want to achieve your goal?
          <span className="detail-explain"> Ej. 3 per week</span>
          <div className="form-inputs form-input-frequency ">
            <input
              type="number"
              className="form-inputs input"
              placeholder="1"
              value={events}
              onChange={(e) => onChange(e, "events")}
            ></input>
            <select
              placeholder="Ej. Day"
              className="form-inputs input"
              value={frequency}
              onChange={(e) => onChange(e, "frequency")}
            >
              {frequencies.map((freq, index) => (
                <option key={index} className="input" value={freq}>
                  per {freq}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="form-inputs">
          How many times do you want to achieve this goal?
          <input
            type="number"
            className="input"
            placeholder="1"
            value={goal}
            onChange={(e) => onChange(e, "goal")}
          ></input>
        </label>

        <label className="form-inputs">
          Does it has a due date?
          <input
            type="date"
            className="input"
            placeholder="Ej. run 5K"
            value={formattedDate}
            onChange={(e) => onChange(e, "duedate")}
          />
        </label>

        <label className="form-inputs">
          How many times have you completed this goal?
          <input
            type="number"
            className="input"
            placeholder="1"
            value={complete}
            onChange={(e) => onChange(e, "complete")}
          ></input>
        </label>

        <label className="form-inputs">
          Choose an icon for your goal
          <div className="form-icon-select">
            <div className="icon-selected ">
              <img alt="goal type icon" src={icons[selectedIcon]} />
            </div>
            <select
              placeholder="Ej. Day"
              className="form-inputs input"
              onChange={(e) => onChange(e, "icon")}
              value={icon}
            >
              {Object.keys(icons).map((icon, index) => (
                <option key={index} className="input" value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>
        </label>
      </form>
      <div className="detail-btn-box">
        {id ? (
          <button className="detail-btn" onClick={update}>
            Update
          </button>
        ) : (
          <button className="detail-btn" onClick={create}>
            Create
          </button>
        )}

        {id && (
          <button className="detail-btn-red" onClick={deletebtn}>
            Delete
          </button>
        )}

        <Link to="/list" className="detail-btn">
          <button>Cancel</button>
        </Link>
      </div>
      {showModal ? (
        <Modal>
          <ModalCreate yesbtn={newgoalbtn} />
        </Modal>
      ) : (
        <></>
      )}
      {showModalConfirm ? (
        <Modal>
          <ModalCreate confirmdelete={confirmdelete} nodelete={deletebtn} />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Details;
