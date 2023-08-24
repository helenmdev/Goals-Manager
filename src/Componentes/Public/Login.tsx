import React from "react";
import { useNavigate } from "react-router-dom";
import Credentials from "../Shared/Credentials";
import { login } from "../../Services/AuthRequests";
import { setUpNotifications } from "reapop";
import { useNotifications } from "reapop";

const Login = () => {
  const navigate = useNavigate();

  setUpNotifications({
    defaultProps: {
      title: "Unauthorized",
      position: "top-center",
      dismissible: true,
      dismissAfter: 5000,
    },
  });

  const { notify } = useNotifications();

  const send = async (form: { username: string; password: string }) => {
    try {
      const token = await login(form);
      try {
        navigate("/list");
        localStorage.setItem("token", JSON.stringify(token));
      } catch (err) {
      }
    } catch (error) {
      if (!form.username || !form.password) {
        notify("Please enter user and password", "error");
      } else {
        if (error.response) {
          if (error.response.status === 404) {
            notify("Account not found", 'error');
          } else if (error.response.status === 401) {
            notify("Invalid password", 'error');
          }
        }
        throw new Error("An error occurred. Please try again later.");
      }
    };
  };

  const redirect = () => {
    navigate("/signup");
  };

  return (
    <Credentials
      send={send}
      title="Log in"
      button="Log in"
      link="Create new account"
      redirect={redirect}
    ></Credentials>
  );
};

export default Login;
