import React from "react";
import { useNavigate } from "react-router-dom";
import Credentials from "../Shared/Credentials";
import { signup } from "../../Services/AuthRequests";
import { setUpNotifications } from "reapop";
import { useNotifications } from "reapop";
import Styles from "./Signup.module.css";

const CreatedNotification = {
  title: "Account Created",
  message: "Great! your account has been created successfully!",
  status: "success",
  dismissible: true,
  dismissAfter: 4000,
};

setUpNotifications({
  defaultProps: {
    position: "top-right",
    dismissible: true,
    dismissAfter: 5000,
  },
});

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { notify } = useNotifications();

  const send = async (form: { email: string; password: string }) => {
    try {
      const token = await signup(form);
      localStorage.setItem("token", JSON.stringify(token));
      notify(CreatedNotification);
      setTimeout(() => {
        navigate("/list");
      }, 1000);
    } catch (error) {
      console.error(error);
  
      if (Array.isArray(error)) {
        if (error.includes("Please enter a valid email")) {
          notify("Please enter a valid email", "error");
        }
        if (error.includes("Password must have at least 6 characters")) {
          notify("Password must have at least 6 characters", "error");
        }
      } else {
        notify("Something went wrong", "error");
      }
    }
  };

  const redirect = () => {
    navigate("/login");
  };

  return (
    <>
      <Credentials
        send={send}
        title="Sign Up"
        button="Sign Up"
        link="I already have an account"
        redirect={redirect}
        signup={true}
      />
    </>
  );
};

export default Signup;
