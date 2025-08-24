import { useFinanceData } from "./dataHook";

function generateColors(count: number) {
  return Array.from({ length: count }, (_, i) => 
    `hsl(${(i * 360) / count}, 70%, 50%)`
  );
}

export function useDoughnutChartData() {
  const { expenseData } = useFinanceData();

  return {
    labels: expenseData.map(e => e.category),
    datasets: [
      {
        label: "Expenses",
        data: expenseData.map(e => e.amount),
        backgroundColor: generateColors(expenseData.length),
        hoverOffset: 4,
      },
    ],
  };
}

export function useBarChartData() {
  const { incomeData } = useFinanceData();

  return {
    labels: incomeData.map(i => i.source),
    datasets: [
      {
        label: "Income Sources",
        data: incomeData.map(i => i.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: generateColors(incomeData.length),
        borderWidth: 1,
      },
    ],
  };
}