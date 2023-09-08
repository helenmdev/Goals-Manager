import React, { ChangeEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Credentials.module.css";
import Cookies from "js-cookie";
import { encryptData, decryptData } from "../../Services/Memory/RememberCrypt";
import { AiOutlineEye as EyeIcon } from "react-icons/ai";
import { AiOutlineEyeInvisible as EyeIconClose } from "react-icons/ai";

interface CredentialsProps {
  send: Function;
  title: string;
  button: string;
  link: string;
  redirect: Function;
  signup: boolean;
}

const Credentials = ({
  send,
  title,
  button,
  link,
  redirect,
  signup,
}: CredentialsProps) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: "",
  });

  const { remember } = form;

  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const encodedCookie = Cookies.get("rememberme");
    if (encodedCookie) {
      const loginCookie = decryptData(encodedCookie);
      const deserializedForm = loginCookie;
      setForm(deserializedForm);
      if (deserializedForm.remember === true) {
        const rememberCheckbox = document.getElementById("remember-checkbox");
        (rememberCheckbox as HTMLInputElement).checked = true;
      }
    }
  }, []);

  useEffect(() => {
    if (!signup) {
      const encodedCookie = Cookies.get("rememberme");
      if (encodedCookie) {
        const loginCookie = decryptData(encodedCookie);
        if (loginCookie) {
          const deserializedForm = JSON.parse(loginCookie.form);
          setForm(deserializedForm);
          if (deserializedForm.remember) {
            const rememberCheckbox =
              document.getElementById("remember-checkbox");
            (rememberCheckbox as HTMLInputElement).checked = true;
          }
        }
      }
    }
  }, [signup]);

  const navigate = useNavigate();

  const [userValidation, setUserValidation] = useState(" ");
  const [passValidation, setPassValidation] = useState(" ");

  const onChange = (event: ChangeEvent, prop: string) => {
    const value =
      prop === "remember"
        ? (event.target as HTMLInputElement).checked
        : (event.target as HTMLInputElement).value;

    if (prop === "username") {
      const emailRegex = /^\S+@\S+\.\S+$/;
      const isValidEmail = emailRegex.test(value);
      setUserValidation(isValidEmail ? "" : "Username must be a valid email");
    } else if (prop === "password") {
      const isValidPassword = value.length > 5;
      setPassValidation(
        isValidPassword ? "" : "Password must have more than 5 characters"
      );
    }

    setForm((state) => ({ ...state, [prop]: value }));
  };

  const inAccess = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    send(form);
    setCookie();
  };

  const setCookie = () => {
    if (remember) {
      const serializedForm = JSON.stringify(form);
      Cookies.set("rememberme", encryptData({ form: serializedForm }), {
        expires: remember ? 7 : 0,
        secure: true,
      });
    } else {
      Cookies.remove("rememberme");
    }
  };

  const showPassword = () => {
    setShowPass(!showPass);
  };

  return (
    
    <div className={styles.mainbox}>
   
      <div className={signup ? styles.cardsignup : styles.card}>
        <h1 className={styles.h1}>{title}</h1>
        <form className={styles.formcardAuth}>
          <label className={styles.labelAuth}>
            User
            <input
              className={styles.inputAuth}
              placeholder="Write your Email"
              value={form.username}
              onChange={(e) => onChange(e, "username")}
            />
            <p className={styles.userValidation}>{userValidation}</p>
          </label>

          <label className={styles.labelAuth}>
            Password
            <div className={styles.boxAuthPass}>
              <input
                type={showPass ? "text" : "password"}
                autoComplete="on"
                className={styles.inputAuthPass}
                placeholder="Write your password"
                value={form.password}
                onChange={(e) => onChange(e, "password")}
              ></input>

              {showPass ? (
                <EyeIconClose
                  className={styles.eyeIcon}
                  onMouseDown={showPassword}
                  onMouseUp={showPassword}
                />
              ) : (
                <EyeIcon
                  className={styles.eyeIcon}
                  onMouseDown={showPassword}
                  onMouseUp={showPassword}
                />
              )}
            </div>
            <p className={styles.passValidation}>{passValidation}</p>
          </label>
        </form>
        <div className={styles.button} onClick={(e) => inAccess(e)}>
          {button}
        </div>
        {!signup && (
          <div
            className={styles.forgotpass}
            onClick={() => navigate("/forgotpassword")}
          >
            forgot your password?
          </div>
        )}
      </div>

      {!signup && (
        <div className={styles.remember}>
          <input
            type="checkbox"
            id="remember-checkbox"
            className={styles.checkbox}
            value={remember}
            onChange={(e) => onChange(e, "remember")}
          />{" "}
          Remember me
        </div>
      )}
      <div className={styles.buttonLink} onClick={(e) => redirect(e)}>
        {link}
      </div>
    </div>
  );
};

export default Credentials;
