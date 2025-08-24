
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

type IncomeDataItem = {
  id: string;
  source: string;
  amount: number;
  date: Date;
  userId: string;
};

type ExpenseDataItem = {
  id: string;
  category: string;
  amount: number;
  date: Date;
  userId: string;
};

export function useFinanceData() {
  const [expenseData, setExpenseData] = useState<ExpenseDataItem[]>([]);
  const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/expense`,
          config
        );
        setExpenseData(response.data.data);
      } catch (e) {
        console.error("Error fetching expenses:", e);
      }
    };

    const fetchIncome = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/income`,
          config
        );
        setIncomeData(response.data.data);
      } catch (e) {
        console.error("Error fetching incomes:", e);
      }
    };

    fetchExpense();
    fetchIncome();
  }, []);

  return { expenseData, incomeData };
}
