import React, { useContext, useState, useEffect } from "react";
import Styles from "./Settings.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { deleteAccount } from "../../Services/AuthRequests";
import Modal from "./Modal";
import { useNotifications } from "reapop";
import { AccountContext } from "../../Services/Memory/Navigation";
import useGetGoals from "../../Hooks/useGetGoals";
import { userToken, userId, userName } from "../../Services/Memory/userData";

const deleteNotification = {
  title: "Account Deleted",
  message: "Your account has been deleted successfully!",
  position: "top-center",
  status: "success",
  dismissible: true,
  dismissAfter: 4000,
};

const Settings = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const { setAccount } = useContext(AccountContext);
  const token = userToken();
  const user_id = userId();
  const user = userName();

  const { notify } = useNotifications();

  useGetGoals(token, user_id);

  const resetPass = () => {
    navigate(`/settings/${user_id}/resetpassword`);
  };

  const deleteAccountFunc = async () => {
    setConfirmDelete(true);
  };

  const confirmAccountDelete = async () => {
    await deleteAccount(user_id, token)
      .then(() => {
        navigate("/login");
        notify(deleteNotification);
      })
      .catch((error) => {
      });
  };

  const nodelete = () => {
    setConfirmDelete(false);
  };

  useEffect(() => {
    setAccount(true);

    return () => {
      setAccount(false);
    };
  }, [setAccount]);

  return (
    <>
      {confirmDelete && (
        <Modal showModal={nodelete}>
          <div className={Styles.createPopup}>
            <div>Do you want to delete this account?</div>
            <div className={Styles.modalBtns}>
              <button
                className={Styles.modalBtn}
                onClick={confirmAccountDelete}
              >
                Yes
              </button>
              <button className={Styles.modalBtn} onClick={nodelete}>
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className={Styles.settingsBox}>
        <h1 className={Styles.settingsTitle}>Settings</h1>
        <div className={Styles.accountBox}>
          <h1 className={Styles.accountUsername}>{user}</h1>
          <div className={Styles.accountOption} onClick={resetPass}>
            Change Password
          </div>
          <div className={Styles.accountOption} onClick={deleteAccountFunc}>
            Delete Account
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Settings;
