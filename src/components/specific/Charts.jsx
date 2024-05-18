import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, Tooltip, Filler, LinearScale, PointElement, ArcElement, Legend } from "chart.js/auto";
import { orange, orangeLight, purple, purpleLight } from "../../constants/color";
import { getLast7Days } from "../../lib/features";

//we have 2 chart line and doughnut chart

ChartJS.register(CategoryScale, Tooltip, Filler, LinearScale, PointElement, ArcElement, Legend);

const labels = getLast7Days();

const lineChartOptions = {
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

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Messages",
        data: value,
        backgroundColor: purpleLight,
        borderColor: purple,
        fill: true,
      },
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
};
//here the data depends on props so we need to add it inside
const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: [purpleLight, orange],
        hoverBackgroundColor: [purple, orangeLight],
        borderColor: [purple, orange],
        offset: 40,
      },
    ],
  };
  return <Doughnut style={{ zIndex: 10 }} data={data} options={doughnutChartOptions} />;
};

export { LineChart, DoughnutChart };
