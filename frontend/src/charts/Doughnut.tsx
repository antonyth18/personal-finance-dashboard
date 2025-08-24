import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut as DoughnutChart } from "react-chartjs-2";
//@ts-ignore
import { useDoughnutChartData, useBarChartData } from "./DATA";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Doughnut: React.FC = () => {
  const chartData = useDoughnutChartData();
    const options = {
        maintainAspectRatio: false,
        layout: {
          padding: 0,
        },
        plugins: {
          legend: {
            position: "right" as const,
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              padding: 25,
              font: {
                size: 14,
                weight: 600,
              },
              color: "white",
            },
          },
        },
      };
  
    return (
      <div className="flex justify-center items-center pt-5" style={{ width: "500px", height: "240px" }}>
          <DoughnutChart data={chartData} options={options}/>     
      </div>
    );
  };
