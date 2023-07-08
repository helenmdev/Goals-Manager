import React, { useContext, FormEvent } from "react";
import { ContextAuth } from "../../Services/Memory/Autheentication";
import { useNavigate } from "react-router-dom";
import Credentials from "../Shared/Credentials";
import { login } from "../../Services/AuthRequests";
import { setUpNotifications } from "reapop";
import { useNotifications } from "reapop";

const Login = () => {
  const navigate = useNavigate();
  const [auth, dispatchAuth] = useContext(ContextAuth);

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
      navigate("/list");
      dispatchAuth({ type: "put", token: token });
      localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
      if (!form.username || !form.password) {
        notify("Please enter user and password", "error");
      } else {
        if (error.message === "Invalid password") {
          notify("Invalid password", "error");
        }
        if (error.message === "Account not found") {
          notify("Account not found", "error");
        }
      }
    }
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
