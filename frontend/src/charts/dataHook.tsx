import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

type IncomeDataItem = {
  id: string;
  source: string;
  amount: number;
  date: string;
  userId: string;
};

type ExpenseDataItem = {
  id: string;
  category: string;
  amount: number;
  date: string;
  userId: string;
  type: "onetime" | "recurring";
};

export function useFinanceData() {
  const [expenseData, setExpenseData] = useState<ExpenseDataItem[]>([]);
  const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: { Authorization: "Bearer " + token },
    };

    const toISO = (val: any): string => {
      if (!val) return "";
      const d = val instanceof Date ? val : new Date(val);
      return isNaN(d.getTime()) ? "" : d.toISOString();
    };

    const fetchExpense = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/expense`, config);
        const oneTime: ExpenseDataItem[] = response.data.data.map((item: any) => ({
          id: String(item.id),
          userId: String(item.userId),
          amount: Number(item.amount ?? 0),
          category: String(item.category ?? ""),
          date: toISO(item.date),
          type: "onetime",
        }));
        setExpenseData((prev) => [
          ...prev.filter((d) => d.type !== "onetime"),
          ...oneTime,
        ]);
      } catch (e) {
        console.error("Error fetching one-time expenses:", e);
      }
    };

    const fetchRecExpense = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/expense/recurring`, config);
        const recurring: ExpenseDataItem[] = response.data.data.map((item: any) => ({
          id: String(item.id),
          userId: String(item.userId),
          amount: Number(item.recurringAmount ?? item.amount ?? 0),
          category: String(item.category ?? ""),
          date: toISO(item.startDate ?? item.date),
          type: "recurring",
        }));
        setExpenseData((prev) => [
          ...prev.filter((d) => d.type !== "recurring"),
          ...recurring,
        ]);
      } catch (e) {
        console.error("Error fetching recurring expenses:", e);
      }
    };

    const fetchIncome = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/income`, config);
        const income: IncomeDataItem[] = response.data.data.map((item: any) => ({
          id: String(item.id),
          userId: String(item.userId),
          source: String(item.source ?? ""),
          amount: Number(item.amount ?? 0),
          date: toISO(item.date),
        }));
        setIncomeData(income);
      } catch (e) {
        console.error("Error fetching incomes:", e);
      }
    };

    fetchExpense();
    fetchRecExpense();
    fetchIncome();
  }, []);

  return { expenseData, incomeData };
}

