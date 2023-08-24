import React, { useState, FormEvent } from "react";
import axios from "axios";
import styles from "../Shared/Credentials.module.css";
import { useNavigate } from "react-router-dom";
import { setUpNotifications } from "reapop";
import { useNotifications } from "reapop";

const ForgotPasswordReq: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  setUpNotifications({
    defaultProps: {
      position: "top-center",
      dismissible: true,
      dismissAfter: 5000,
    },
  });

  const { notify } = useNotifications();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("/forgot_password", { email });
      notify("Password reset email sent", "success");
    } catch (error) {
      notify("Something went wrong, try again", "error");
    }
  };

  return (
    <div className={styles.mainboxForgot}>
      <div className={styles.cardForgot}>
        <h1 className={styles.h1}>Forgot Password</h1>

        <form className={styles.formcardForgot} onSubmit={handleSubmit}>
          <h1 className={styles.titletext}>
            Forgot password? enter your email address and we will send you a link
            to reset your password
          </h1>
          <label className={styles.labelForgot}>
            Email
            <input
              type="email"
              className={styles.inputReset}
              placeholder="Write your user"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <button type="submit" className={styles.buttonForgot}>
            Send Email
          </button>
        </form>
      </div>

      <h1 className={styles.linktext} onClick={() => navigate("/login")}>
        Back to login
      </h1>
    </div>
  );
};

export default ForgotPasswordReq;
