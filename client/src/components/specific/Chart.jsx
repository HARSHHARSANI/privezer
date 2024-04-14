import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  plugins,
} from "chart.js";
import { getLast7Days } from "../../lib/features";
import { orange, purple } from "../constants/color";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const LineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const DoughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
  cutout: 80,
};

export const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        borderColor: "#3e95cd",
        fill: false,
        label: "Messages",
        backgroundColor: "#3e95cd",
      },
    ],
  };
  return <Line data={data} options={LineChartOptions} />;
};

export const DoughnutChart = ({ value = [], labels }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        borderColor: "#3e95cd",

        label: "Total Chats Vs Group Chats",
        backgroundColor: [purple, orange],
        borderColor: [purple, orange],
        offset: 40,
      },
    ],
  };
  return (
    <Doughnut
      style={{
        zIndex: 10,
      }}
      data={data}
      options={DoughnutChartOptions}
    >
      Chart
    </Doughnut>
  );
};
