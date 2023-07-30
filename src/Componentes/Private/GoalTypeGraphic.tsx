import React, { useContext } from "react";
import { ContextGoals } from "../../Services/Memory/Goals";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Styles from "./Settings.module.css";


const GoalVsCompleteGraphic = () => {
  const [state] = useContext(ContextGoals);
  ChartJS.register(ArcElement);
  

  const goalsCounter = () => {
    let goals: number[] = [];

    if (state.order) {
      state.order.map((id: string) => {
        return goals.push(state.objects[id].goal);
      });
    }

    const initialValue = 0;
    return goals.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, initialValue);
  };

  const completeCounter = () => {
    let completes: number[] = [];

    if (state.order) {
      state.order.map((id: string) => {
        return completes.push(state.objects[id].complete);
      });
    }

    const initialValue = 0;
    return completes.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, initialValue);
  };

  const goalcount = goalsCounter();
  const goalcomplete = completeCounter();

  let dataGoalsComplete: number[] = [];
  dataGoalsComplete.push(goalcount, goalcomplete);

  const data = {
    title: "Active Goals vs Complete Goals",
    labels: ["Active Goals", "Complete Goals"],
    datasets: [
      {
        label: "# of goals",
        data: dataGoalsComplete,
        backgroundColor: ["rgba(0, 185, 206, 100)", "rgba(0, 100, 106, 100)"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className={Styles.goalType}>
      <h1 className={Styles.graphicTitle}>Active Goals vs Complete Goals</h1>
      <Doughnut data={data} />
    </div>
  );
};

export default GoalVsCompleteGraphic;
