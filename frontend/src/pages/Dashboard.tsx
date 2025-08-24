
import AppBar from "../components/AppBar";
import DbCard from "../components/DbCard";
import FeatureCard from "../components/FeatureCard";
import Sidebar from "../components/Sidebar";
import { Doughnut } from "../charts/Doughnut"
import { Bar } from "../charts/Bar"
import SavingCard from "../components/SavingCard";
import ExpenseCard from "../components/ExpenseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

type SavingDataItem = {
    id: string;
    goal: string;
    target_amt: number;
    saved_amt: number;
    userId: string;
  };

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

export default function Dashboard() {
    const [expenseData, setExpenseData] = useState<ExpenseDataItem[]>([]);
    const [incomeData, setIncomeData] = useState<IncomeDataItem[]>([]);
    const [savingData, setSavingData] = useState<SavingDataItem[]>([]);
    const token = localStorage.getItem("token");
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

    const fetchExpense = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/expense`, config);
            setExpenseData(response.data.data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchIncome = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/income`, config);
            setIncomeData(response.data.data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchSavings = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/savings`, config);
            setSavingData(response.data.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchExpense();
        fetchIncome();
        fetchSavings();
    }, []);

    var income = 0;
    var expense = 0;
    var savings = 0;

    incomeData.map((data) => {
        income += data.amount
    })

    expenseData.map((data) => {
        expense += data.amount
    })

    savingData.map((data) => {
        savings += data.saved_amt
    })

    const balance = income - (expense + savings)

    return <div className="bg-big-black grid grid-cols-[16rem_1fr]">
        <div>
            <Sidebar />
        </div>

        <div>
            <AppBar heading="Dashboard"/>

            <div className="p-7">
                <div className="font-bold text-lg text-white pb-4 pl-2">
                    Overview
                </div>
                <div className="flex justify-between w-full">
                    <div className="pr-2">
                        <DbCard label={"Balance"} amount={(balance ?? 0).toLocaleString("en-US")} />
                    </div>

                    <div className="pr-2">
                        <DbCard label={"Income"} amount={(income ?? 0).toLocaleString("en-US")} />
                    </div>

                    <div className="pr-2">
                        <DbCard label={"Expense"} amount={(expense ?? 0).toLocaleString("en-US")} />
                    </div>

                    <div className="pr-2">
                        <DbCard label={"Savings"} amount={(savings ?? 0).toLocaleString("en-US")} />
                    </div>
                </div>
            </div>

            <div className="flex justify-between pl-7 pr-7 pb-7 w-full">
                <div className="flex-1 pr-4">
                    <FeatureCard label={"Expense Breakdown"} graph={Doughnut}/>
                </div>
                <div className=" flex-1 pl-4">
                    <FeatureCard label={"Income Source"} graph={Bar}/>
                </div>
            </div>

            <div className="flex justify-between pl-7 pr-7 pb-7">
                <div className="flex-1 pr-4">
                    <SavingCard label={"Saving Goals"} savingData={savingData}/>
                </div>
                <div className="flex-1 pl-4">
                    <ExpenseCard label={"Recurring Expenses"}/>
                </div>
            </div>

            <div className="p-5"></div>

        </div>
    </div>
}