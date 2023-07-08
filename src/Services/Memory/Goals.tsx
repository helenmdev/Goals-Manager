import React from "react";
import { createContext, useReducer, ReactNode } from "react";

const initialState = {
  order: [],
  objects: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "put": {
      const goals = action.goals;
      const newState = {
        order: goals.map((goal) => goal.id),
        objects: goals.reduce(
          (object, goal) => ({ ...object, [goal.id]: goal }),
          {}
        ),
      };
      //localStorage.setItem("goals", JSON.stringify(newState));
      return newState;
    }
    case "create": {
      const id = action.goal.id;
      const newState = {
        order: [...state.order, id],
        objects: {
          ...state.objects,
          [id]: action.goal,
        },
      };

      //localStorage.setItem("goals", JSON.stringify(newState));
      return newState;
    }
    case "update": {
      const id = state.objects.id;
      state.objects[id] = {
        ...state.objects[id],
        ...action.goal,
      };

      const newState = { ...state };
      //localStorage.setItem("goals", JSON.stringify(newState));
      return newState;
    }
    case "delete": {
      const id = state.objects.id;
      const newOrder = state.order.filter((item) => item !== id);
      delete state.objects[id];
      const newState = {
        order: newOrder,
        objects: state.objects,
      };
      // localStorage.setItem("goals", JSON.stringify(newState));
      return newState;
    }
    default:
      throw new Error();
  }
};

export const ContextGoals = createContext(null);

interface MemoryGoalsProps {
  children: ReactNode;
}

const MemoryGoals = ({ children }: MemoryGoalsProps) => {
  const value = useReducer(reducer, initialState);

  return (
    <ContextGoals.Provider value={value}>{children}</ContextGoals.Provider>
  );
};

export default MemoryGoals;
