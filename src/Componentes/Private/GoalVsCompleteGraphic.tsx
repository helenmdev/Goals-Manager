import React, { useContext } from "react";
import { ContextGoals } from "../../Services/Memory/Goals";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Styles from "./Settings.module.css";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GoalTypeGraphic = () => {
  const [state] = useContext(ContextGoals);

  const countIcons = () => {
    let elements: string[] = [];

    if (state.order) {
      state.order.map((id: string) => {
        if (
          state.objects[id].icon !==
          "/static/media/target.14e881f54772ce4b0ec7.png"
        ) {
          return elements.push(state.objects[id].icon);
        }
      });
    }

    return elements.reduce(
      (count: { [key: string]: number }, currentValue: string) => {
        count[currentValue] = (count[currentValue] || 0) + 1;
        return count;
      },
      {}
    );
  };

  const dataNumbers = Object.values(countIcons());
  const dataLabels = Object.keys(countIcons());

  const labels = dataLabels;

  const data = {
    labels,
    datasets: [
      {
        label: "# of Goals",
        data: dataNumbers,
        backgroundColor: [
          "rgba(255, 99, 132, 50)",
          "rgba(255, 159, 64, 50)",
          "rgba(255, 205, 86, 50)",
          "rgba(75, 192, 192, 50)",
          "rgba(54, 162, 235, 50)",
          "rgba(153, 102, 255, 50)",
          "rgba(201, 203, 207, 50)",
        ],
      },
    ],
  };

  return (
    <div className={Styles.graphicCompletegoals}>
      <h1 className={Styles.graphicTitle}>Created goals by type</h1>
      <Bar data={data} />
    </div>
  );
};

export default GoalTypeGraphic;
