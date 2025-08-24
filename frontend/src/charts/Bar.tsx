import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
import { Bar as BarChart } from "react-chartjs-2";
import { useBarChartData } from "./DATA";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Bar: React.FC = () => {
  const barChartData = useBarChartData();
    return (
      <div style={{ width: "500px", height: "400px" }}>
        <BarChart data={barChartData} />
      </div>
    );
  };