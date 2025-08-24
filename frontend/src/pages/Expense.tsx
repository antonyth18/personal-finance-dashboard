import axios from "axios";
import AppBar from "../components/AppBar";
import { InputBar, useExpense } from "../components/InputBar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

type Frequency = "daily" | "weekly" | "monthly" | "yearly" | "onetime" | null;

type ExpenseItem = {
  id: string;
  userId: string;
  amount: number;
  category: string;
  date: string;
  type: "onetime" | "recurring";
};

export default function Expense() {
  const { expenseInput, setExpenseInput } = useExpense();
  const [expenseData, setExpenseData] = useState<ExpenseItem[]>([]);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const toISO = (val: any): string => {
    if (!val) return "";
    const d = val instanceof Date ? val : new Date(val);
    return isNaN(d.getTime()) ? "" : d.toISOString();
  };

  const fetchExpense = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/expense`, config);
      const oneTime: ExpenseItem[] = response.data.data.map((item: any) => ({
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
      console.error(e);
    }
  };

  const fetchRecExpense = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/expense/recurring`,
        config
      );
      const recurring: ExpenseItem[] = response.data.data.map((item: any) => ({
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
      console.error(e);
    }
  };

  useEffect(() => {
    fetchExpense();
    fetchRecExpense();
  }, []);

  async function sendRequest1() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/expense`,
        expenseInput,
        config
      );
      await fetchExpense();
      setExpenseInput({ category: "", date: null, amount: 0 });
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  async function sendRequest2(frequency: Frequency) {
    try {
      const payload = {
        ...expenseInput,
        frequency: frequency?.toUpperCase(),
        recurringAmount: expenseInput.amount,
        startDate: expenseInput.date,
        lastUpdated: new Date().toISOString(),
      };
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/expense/recurring`,
        payload,
        config
      );

      await Promise.all([fetchExpense(), fetchRecExpense()]);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="bg-big-black grid grid-cols-[16rem_1fr]">
      <div>
        <Sidebar />
      </div>

      <div>
        <AppBar heading="Expenses" />
        <InputBar
          sendRequest1={sendRequest1}
          sendRequest2={sendRequest2}
          expenseInput={expenseInput}
          setExpenseInput={setExpenseInput}
        />
        <Table data={expenseData} />
      </div>
    </div>
  );
}
