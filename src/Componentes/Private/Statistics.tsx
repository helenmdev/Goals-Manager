import React, { useEffect, useContext } from "react";
import Styles from "./Settings.module.css";
import GoalTypeGraphic from "./GoalTypeGraphic";
import GoalVsCompleteGraphic from "./GoalVsCompleteGraphic";
import { AccountContext } from "../../Services/Memory/Navigation";
import { setUpNotifications } from "reapop";
import useGetGoals from "../../Hooks/useGetGoals";
import { userToken, userId } from "../../Services/Memory/userData";

const Statistics = () => {
  const token = userToken();
  const id = userId();

  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
      dismissAfter: 5000,
    },
  });

  const { setAccount } = useContext(AccountContext);

  useGetGoals(token);

  useEffect(() => {
    setAccount(true);
    return () => {
      setAccount(false);
    };
  }, []);

  return (
    <div className={Styles.statisticsBox}>
      <h1 className={Styles.statisticsTitle}>Statistics</h1>
      <div className={Styles.graphics}>
        <GoalTypeGraphic className={Styles.canvas} id={id} token={token} />
        <GoalVsCompleteGraphic className={Styles.canvas} id={id} />
      </div>
    </div>
  );
};

export default Statistics;
