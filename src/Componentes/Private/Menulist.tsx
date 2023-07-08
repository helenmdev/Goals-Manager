import React, { useEffect } from "react";
import Styles from "./Menulist.module.css";
import { useContext } from "react";
import { AccountContext } from "../../Services/Memory/Navigation";
import { useNavigate } from "react-router-dom";
import { userId } from "../../Services/Memory/userData";

const Menulist = ({ logout }: { logout: () => void }) => {
  const { setAccount } = useContext(AccountContext);
  const id = userId;
  const navigate = useNavigate();
  const settings = () => {
    navigate(`/settings/${id}`);
    setAccount(true);
  };

  return (
    <div className={Styles.dropdowncontent}>
      <div className={Styles.dropdownitem} onClick={settings}>
        Settings
      </div>
      <div className={Styles.dropdownitem} onClick={logout}>
        log out
      </div>
    </div>
  );
};

export default Menulist;
