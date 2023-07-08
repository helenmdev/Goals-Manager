import React, { useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import "../../App.css";
import Aside from "../Private/Aside";
import Login from "../Public/Login";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  nonPublic: boolean;
}

const Layout: LayoutProps = ({ nonPublic }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const showMenu = () => {
    setMenuVisible(!menuVisible);
  };
const navigate = useNavigate();
  const hideMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div className="App">
      <Header showMenu={showMenu} nonPublic={nonPublic} />
      {nonPublic && <Aside menuVisible={menuVisible} hideMenu={hideMenu} />} 
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
