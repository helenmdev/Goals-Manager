import React, { useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Styles from "./Aside.module.css";
import { HiOutlineClipboardList as ListIcon } from "react-icons/hi";
import { IoMdAddCircleOutline as AddIcon } from "react-icons/io";
import { AccountContext } from "../../Services/Memory/Navigation";
import { MdOutlineManageAccounts as SettingsIcon } from "react-icons/md";
import { MdOutlineAutoGraph as StatisticsIcon } from "react-icons/md";
import { userId } from "../../Services/Memory/userData";

interface AsideProps {
  menuVisible: boolean;
  hideMenu: () => void;
}

const Aside = ({ menuVisible, hideMenu } : AsideProps ) => {
  const { account,  } = useContext(AccountContext);
  const id = userId();
  const sidebar = useRef();

  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      const { target } = event;
      
      if (sidebar.current &&
        !sidebar.current.contains(target) &&
       target.id !== 'headerBurger') {
       hideMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="side-bar-box">
      {account ? (
        <nav className={menuVisible ? Styles.sidebar : Styles.sidebarHide} ref={sidebar}>
          <Link to={`/settings/${id}`} className={Styles.sideLink}>
            <div className={Styles.sideIcon}>
              <SettingsIcon />
            </div>

            <div className={Styles.sidebarText}>Account</div>
          </Link>

          <Link to={`/statistics/${id}`} className={Styles.sideLink}>
            <div className={Styles.sideIcon}>
              <StatisticsIcon />
            </div>

            <div className={Styles.sidebarText}>Statistics</div>
          </Link>
        </nav>
      ) : (
        <nav className={menuVisible ? Styles.sidebar : Styles.sidebarHide} ref={sidebar}>
          <Link to="/list" className={Styles.sideLink}>
            <div className={Styles.sideIcon}>
              <ListIcon />
            </div>

            <div className={Styles.sidebarText}>Goals List</div>
          </Link>

          <Link to="/new" className={Styles.sideLink}>
            <div className={Styles.sideIcon}>
              <AddIcon />
            </div>

            <div className={Styles.sidebarText}>New Goal</div>
          </Link>
        </nav>
      )}
    </nav>
  );
};

export default Aside;
