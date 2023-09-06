import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../Shared/Credentials.module.css";
import { AiFillCloseCircle as CloseIcon } from "react-icons/ai";
import { setUpNotifications } from "reapop";
import { useNotifications } from "reapop";
import { userToken } from "../../Services/Memory/userData";
import { resetPassword, resetUserPassword } from "../../Services/AuthRequests";

const ResetPassword = () => {
  const { token } = useParams();
  const { id } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dataUserToken = userToken();

  setUpNotifications({
    defaultProps: {
      position: "top-center",
      dismissible: true,
      dismissAfter: 5000,
    },
  });

  const { notify } = useNotifications();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const redirectlogin = () => {
      navigate("/login");
    };

    if (newPassword !== confirmPassword) {
      notify("Passwords do not match", "error");
      return;
    }

    try {
      await resetPassword(token, newPassword);
      notify("Password reset successfully", "success");
      setTimeout(redirectlogin, 3000);
    } catch (error) {
      notify("Something went wrong", "error");
    }
  };

  const handleSubmitwithId = async (event) => {
    event.preventDefault();

    const redirectlogin = () => {
      navigate(`/settings/${id}`);
    };

    if (newPassword !== confirmPassword) {
      notify("Passwords do not match", "error");
      return;
    }
    try {
      await resetUserPassword(dataUserToken, newPassword, id);
    
      notify("Password reset successfully", "success");
      setTimeout(redirectlogin, 1000);
    } catch (error) {
      notify("Something went wrong", "error");
      console.log(error);
    }
  };

  const closeResetWindow = () => {
    navigate(`/settings/${id}/`);
  };

  return (
    <>
      {id ? (
        <div className={styles.mainboxForgot}>
          <div className={styles.cardForgot}>
            <div className={styles.header}>
              <h1 className={styles.h1}>Reset Password</h1>
              <CloseIcon
                className={styles.closeIcon}
                onClick={closeResetWindow}
              />
            </div>
            <form
              className={styles.formcardForgot}
              onSubmit={handleSubmitwithId}
            >
              <label className={styles.labelForgot}>
                New Password
                <input
                  type="password"
                  className={styles.inputReset}
                  placeholder="Write your new password"
                  value={newPassword}
                  autoComplete="on"
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
              </label>

              <label className={styles.labelForgot}>
                Confirm Password
                <input
                  type="password"
                  className={styles.inputReset}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  autoComplete="on"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </label>
              <button type="submit" className={styles.buttonForgot}>
                Reset Password
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.mainboxForgot}>
          <div className={styles.cardForgot}>
            <div className={styles.header}>
              <h1 className={styles.h1}>Reset Password</h1>
            </div>
            <form className={styles.formcardForgot} onSubmit={handleSubmit}>
              <label className={styles.labelForgot}>
                New Password
                <input
                  type="password"
                  className={styles.inputReset}
                  placeholder="Write your new password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
              </label>

              <label className={styles.labelForgot}>
                Confirm Password
                <input
                  type="password"
                  className={styles.inputReset}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </label>
              <button type="submit" className={styles.buttonForgot}>
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
