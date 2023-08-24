import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";
import Layout from "./Componentes/Shared/Layout";
import List from "./Componentes/Private/List";
import Details from "./Componentes/Private/Details.tsx";
import NotFound from "./Componentes/Shared/NotFound";
import Modal from "./Componentes/Private/Modal.tsx";
import Login from "./Componentes/Public/Login";
import Signup from "./Componentes/Public/Signup";
import ForgotPasswordReq from "./Componentes/Public/ForgotPasswordReq";
import ResetPassword from "./Componentes/Private/ResetPassword";
import Settings from "./Componentes/Private/Settings";
import Statistics from "./Componentes/Private/Statistics";
import { setUpNotifications } from "reapop";

function App() {
  const { notifications, dismissNotification } = useNotifications();
  const navigate = useNavigate();

  const cleanModal = () => {
    navigate("/settings/:accountId");
  };

  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
      dismissAfter: 5000,
    },
  });

  const closeModal = () => {
    navigate("/list");
  };

  return (
    <>
      <div>
        <NotificationsSystem
          // 2. Pass the notifications you want Reapop to display.
          notifications={notifications}
          // 3. Pass the function used to dismiss a notification.
          dismissNotification={(id) => dismissNotification(id)}
          // 4. Pass a builtIn theme or a custom theme.
          theme={atalhoTheme}
        />
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>

        <Route element={<Layout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/forgotpassword" element={<ForgotPasswordReq />}></Route>
          <Route
            path="/resetpassword/:token"
            element={<ResetPassword />}
          ></Route>
        </Route>

        <Route element={<Layout nonPublic />}>
          <Route path="/settings/:id" element={<Settings />}>
            <Route
              path="/settings/:id/resetpassword"
              element={
                <Modal cleanModal={cleanModal}>
                  <ResetPassword />
                </Modal>
              }
            ></Route>
          </Route>

          <Route path="/statistics/:id" element={<Statistics />}></Route>

          <Route path="/list" element={<List />}>
            <Route
              path="/list/:id"
              element={
                <Modal cleanModal={closeModal}>
                  <Details />
                </Modal>
              }
            ></Route>
          </Route>
          <Route path="/new" element={<Details />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
