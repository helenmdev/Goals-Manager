import { useContext, useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotificationsSystem, { atalhoTheme, useNotifications } from "reapop";

import Layout from './Componentes/Shared/Layout';
import List from "./Componentes/Private/List";
import Details from "./Componentes/Private/Details";
import NotFound from "./Componentes/Shared/NotFound";
import Modal from "./Componentes/Private/Modal";
import { Context } from "./Services/Memory";
import { requestGoals } from "./Services/Requests";
import Login from "./Componentes/Public/Login";
import Singup from "./Componentes/Public/Singup";
import Auth from "./Componentes/Public/Auth";

function App() {
  const { notifications, dismissNotification } = useNotifications();
  const [, dispatch] = useContext(Context);

  const fetch = useCallback(
    async function fetchData() {
      const goals = await requestGoals();
      dispatch({ type: "put", goals: goals });
    },
    [dispatch]
  );

  useEffect(() => {
    fetch();
  }, [fetch, dispatch]);

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
        <Route path="/" element={<Navigate to="/list" />}></Route>

        <Route element={<Layout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/singup" element={<Singup />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>

        <Route element={<Layout private />}>
          <Route element={<Auth />}>
            <Route path="/list" element={<List />}></Route>
            <Route
              path="/list/:id"
              element={
                <Modal>
                  <Details />
                </Modal>
              }
            ></Route>
             <Route path="/new" element={<Details />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
