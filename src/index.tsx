import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "reapop";
import MemoryGoals from "./Services/Memory/Goals";
import AccountContext from "./Services/Memory/Navigation";
import ShowModalContext from "./Services/Memory/ShowModal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NotificationsProvider>
        <AccountContext>
          <ShowModalContext>
            <MemoryGoals>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </MemoryGoals>
          </ShowModalContext>
          </AccountContext>
    </NotificationsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
