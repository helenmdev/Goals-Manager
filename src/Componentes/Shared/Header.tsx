import React from "react";
import { MdStairs as LogoIcon } from "react-icons/md";
import { FaUserAlt as UserIcon } from "react-icons/fa";
import { GiHamburgerMenu as HamburguerIcon } from "react-icons/gi";
import Styles from "./Header.module.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../Services/Memory/Navigation";
import { useNotifications } from "reapop";
import { userId } from "../../Services/Memory/userData";

interface HeaderProps {
  showMenu: () => void;
  nonPublic: boolean;
}

const Header = ({ showMenu, nonPublic }: HeaderProps) => {
  const { setAccount } = useContext(AccountContext);
  const navigate = useNavigate();
  const { notify } = useNotifications();

  const logoutFunc = async () => {
    localStorage.removeItem("token");
    navigate("/login");
    notify("Session closed", "success");
  };

  const logoClick = () => {
    navigate("/list");
    setAccount(false);
  };

  const id = userId();
  const settings = () => {
    navigate(`/settings/${id}`);
    setAccount(true);
  };

  const privateHeader = (
    <header className={Styles.headerBg}>
      <HamburguerIcon
        className={`${Styles.icon} ${Styles.hambIcon}`}
        onClick={showMenu}
        id="headerBurger"
      />
      <div className={Styles.logoBg} onClick={logoClick}>
        <LogoIcon className={Styles.logo} />
        <div>Goals</div>
      </div>
      <nav className={Styles.usermenubox}>
        <UserIcon className={Styles.dropdownicon}  />
        <div className={Styles.dropdowncontent}>
          <div className={Styles.dropdownitem} onClick={settings}>
            Settings
          </div>
          <div className={Styles.dropdownitem} onClick={logoutFunc}>
            log out
          </div>
        </div>
      </nav>
    </header>
  );

  const publicHeader = (
    <nav className={Styles.headerBg}>
      <div className={Styles.logoBg}>
        <LogoIcon className={Styles.logo} />
        <a href="/">Goals</a>
      </div>
    </nav>
  );

  return nonPublic ? privateHeader : publicHeader;
};

export default Header;
