import axios from "axios";
import AppBar from "../components/AppBar";
import Contribution from "../components/Contribution";
import { ProgressDisplay } from "../components/SavingCard";
import Sidebar from "../components/Sidebar";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

type SavingDataItem = {
    id: string;
    goal: string;
    target_amt: number;
    saved_amt: number;
    userId: string;
  };

export function useGoal() {
    const [goalVal, setGoalVal] = useState({
        goal: "",
        target_amt: 0
    });

    return { goalVal, setGoalVal }
}

export function useContri() {
    const [contriVal, setContriVal] = useState({
        id: "",
        goal: "",
        amount: 0
    });

    return { contriVal, setContriVal }
}

export default function Savings() {
    const {goalVal, setGoalVal} = useGoal();
    const {contriVal, setContriVal} = useContri();
    const [savingData, setSavingData] = useState<SavingDataItem[]>([]);

    const token = localStorage.getItem("token");

    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
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
        fetchSavings();
    }, []);

    async function setGoal() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/savings/goal`, goalVal, config);
            fetchSavings();
            console.log(response);
        } catch(e) {}
    }

    async function setContri() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/savings/contribution`, contriVal, config);
            fetchSavings();
            console.log(response);
        } catch(e) {}
    }

    return <div className="bg-big-black grid grid-cols-[16rem_1fr]">
        <div>
            <Sidebar />
        </div>
            
        <div>
            <AppBar heading="Savings Goals"/>

            <div className="flex w-full">
                <div className="p-10 flex-1">
                    <Contribution type="contri" savingData={savingData} goal={goalVal} setGoal={setGoalVal} contri={contriVal} setContri={setContriVal} sendRequest={setContri} />
                </div>

                <div className="p-10 flex-1">
                    <Contribution type="goal" savingData={savingData} goal={goalVal} setGoal={setGoalVal} contri={contriVal} setContri={setContriVal} sendRequest={setGoal} />
                </div>
            </div>

            <div className="text-white pl-10 font-semibold text-lg">
                Goal Progress
            </div>
            
            <div className="pr-10 pl-10">
                <ProgressDisplay savingData = {savingData} />
            </div>

            <div className="p-10">
            </div>

        </div>
    </div>
}