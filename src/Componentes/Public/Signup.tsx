import React, { useContext } from "react";
import { ContextAuth } from "../../Services/Memory/Autheentication";
import { useNavigate } from "react-router-dom";
import Credentials from "../Shared/Credentials";
import { signup } from "../../Services/AuthRequests";
import { setUpNotifications } from "reapop";
import { useNotifications } from "reapop";

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
  const [, dispatchAuth] = useContext(ContextAuth);
   const { notify } = useNotifications();

  const send = async (form: { email: string; password: string }) => {
    try {
      const token = await signup(form);
      dispatchAuth({ type: "put", token });
      localStorage.setItem("token", JSON.stringify(token));
      notify(CreatedNotification);
      setTimeout(() => {
        navigate("/list");
      }, 1000);
    } catch {
      notify("Please enter a valid email", "error");
      notify("The password must have at least 6 characters", "error");
    }
  };

  const redirect = () => {
    navigate("/login");
  };

  return (
    <Credentials
      send={send}
      title="Sign Up"
      button="Sign Up"
      link="I already have an account"
      redirect={redirect}
      signup={showSignup}
    />
  );
};

export default Signup;
