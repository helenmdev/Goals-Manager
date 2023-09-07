import React, { useContext } from "react";
import { ContextGoals } from "../../Services/Memory/Goals";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Styles from "./Settings.module.css";

const GoalVsCompleteGraphic = () => {
  const [state] = useContext(ContextGoals);
  ChartJS.register(ArcElement);

  let goals: number[] = [];

  if (state.order) {
    state.order.map((id: string) => {
      return goals.push(state.objects[id].completecheck);
    });
  }

  function counter(goals, value) {
    return goals.reduce((count, currentValue) => {
      if (currentValue === value) {
        count++;
      }
      return count;
    }, 0);
  }

  const goalcount = counter(goals, true);
  const goalcomplete = counter(goals, false);

  let dataGoalsComplete: number[] = [];
  dataGoalsComplete.push(goalcount, goalcomplete);

  const data = {
    title: "Active Goals vs Completed Goals",
    labels: ["Active Goals", "Completed Goals"],
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
      <h1 className={Styles.graphicTitle}>Active Goals vs Completed Goals</h1>
      <Doughnut data={data} />
    </div>
  );
};

export default GoalVsCompleteGraphic;
