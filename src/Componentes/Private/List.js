import React from "react";
import Goal from "./Goal.tsx";
import { useContext } from "react";
import { Context } from "../../Services/Memory";
import { Outlet } from "react-router-dom";


const List = (e) => {
  const [state] = useContext(Context);



  return (
    <>
      {Object.keys(state.order).length > 0 ? (
        state.order?.map((id) => <Goal key={id} {...state.objects[id]}></Goal>)
      ) : (
        <div className="nogoal">
          <p className="main-nogoal-text">"You don't have any goal yet"</p>
          <p>Click on "New Goal" to start adding your goals</p>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default List;
