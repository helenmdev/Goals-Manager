import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { useState } from "react";
import "../../App.css";

const Layout = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const click = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="App">
      <Header click={click} />
      <div className="main">
        <Main menuVisible={menuVisible}>
          <Outlet></Outlet>
        </Main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
