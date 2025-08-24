import { useState } from "react";
import AddButton from "./AddButton";
import InputBox from "./InputBox";
import SelectOpt from "./SavingSelect";

type SavingDataItem = {
    id: string;
    goal: string;
    target_amt: number;
    saved_amt: number;
    userId: string;
  };

type contriType = {
    type: "contri" | "goal"
    sendRequest: () => void | Promise<void>
    savingData: SavingDataItem[];
    goal: {
        goal: string,
        target_amt: number
      };
    setGoal: React.Dispatch<React.SetStateAction<{
        goal: string,
        target_amt: number
      }>>;
    contri: {
        goal: string,
        amount: number
    };
    setContri: React.Dispatch<React.SetStateAction<{
        id: string
        goal: string,
        amount: number
      }>>;
}

export default function Contribution({type, sendRequest, savingData, goal, setGoal, setContri}: contriType) {
    const [selectId, setSelectId] = useState("");
    const [selectGoal, setSelectGoal] = useState("");
    return <div>
        <div className="border rounded-lg">
            <div className="text-white p-5 pb-0 font-bold text-lg">
                Add {type === "contri"? "Contribution": "Goal"}
            </div>
            <div className="p-2"></div>
                {type === "contri"? <SelectOpt selectId={setSelectId} selectGoal={setSelectGoal} savingData={savingData} />: <InputBox label={"Goal"} onChange= {(e) => {
                        setGoal({
                            ...goal,
                            goal: e.target.value
                        })
                    } } />}
                
                <InputBox label={type === "contri"? "amount": "Target Amount"} onChange={type === "contri"? 
                    (e) => {
                        setContri({
                            id: selectId,
                            goal: selectGoal,
                            amount: Number(e.target.value)
                        })
                    } : (e) => {
                        setGoal({
                            ...goal,
                            target_amt: Number(e.target.value)
                        })
                    } }/>
    
                <div className="flex justify-start">
                    <div className="flex justify-start p-5 pt-0">
                        <AddButton onClick={sendRequest} />
                    </div>
                </div>

        </div>
    </div>
}