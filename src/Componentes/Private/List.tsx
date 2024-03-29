import React from "react";
import Goal from "./Goal";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Styles from "./List.module.css";
import { userToken, userId } from "../../Services/Memory/userData";
import { ContextGoals } from "../../Services/Memory/Goals";
import useGetGoals from "../../Hooks/useGetGoals";

interface ListProps {
  menuVisible: boolean;
  hideMenu: () => void;
}

const List = ({ menuVisible }: ListProps) => {
  const userTokenValue: string = userToken() || "NoToken";
const token: { token?: string | undefined } = { token: userTokenValue };
const [state] = useContext(ContextGoals);
const id = userId();
useGetGoals(token.token, id);


  return (
    <>
      <div
        className={!menuVisible ? Styles.goalsList : Styles.goalsListVisible}
      >
        {state.order.length > 0 && Object.keys(state.order).length > 0 ? (
          state.order.map((id) => (
            <Goal key={id} token={token} {...state.objects[id]}></Goal>
          ))
        ) : (
          <div className={Styles.nogoal}>
            <p className={Styles.mainNogoalText}>You don't have any goal yet</p>
            <p>Click on "New Goal" to start adding your goals</p>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default List;
