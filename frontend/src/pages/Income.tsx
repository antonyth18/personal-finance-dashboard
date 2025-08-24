import { useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import AppBar from "../components/AppBar";
import InputBox from "../components/InputBox";
import Sidebar from "../components/Sidebar";
import Table2 from "../components/Table2";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function Income() {
    const [incomeVal, setIncomeVal] = useState({
        source: "",
        amount: 0
    });
    const [incomeData, setIncomeData] = useState([]);

    const token = localStorage.getItem("token");

    const fetchIncome = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/income`, config);
            setIncomeData(response.data.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchIncome();
    }, []);

    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/income`, incomeVal, config);
            fetchIncome();
            setIncomeVal({ source: "", amount: 0 });
            console.log(response);
        } catch(e) {}
    }

    return <div className="bg-big-black grid grid-cols-[16rem_1fr]">
        <div>
            <Sidebar />
        </div>
        
        <div>
            <AppBar heading="Income"/>

            <div className="p-10">
                <div className="border rounded-lg">
                    <div className="text-white p-5 pb-0 font-bold text-lg">
                        Income
                    </div>
                    <div className="p-2"></div>
                    <InputBox onChange={(e) => {
                        setIncomeVal({
                            ...incomeVal,
                            source: e.target.value
                        })
                    }} label={"source"}/>

                    <InputBox onChange={(e) => {
                        setIncomeVal({
                            ...incomeVal,
                            amount: Number(e.target.value)
                        })
                    }}  label={"amount"}/>

                    <div className="flex justify-start">
                        <div className="flex justify-start p-5 pt-0">
                            <AddButton onClick={sendRequest} />
                        </div>
                    </div>

                </div>
            </div>

            <div className="text-white pl-10 font-semibold text-lg">
                Income History
            </div>

            <div className="p-2">
            </div>

            <Table2 data={incomeData} />
    
        </div>
    </div>
}