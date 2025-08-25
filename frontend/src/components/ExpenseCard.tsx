import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

type FeatureCardType2 = {
    label: String

}

type RecExpenseDataItem = {
  id: string;
  category: string;
  amount: number;
  date: Date;
  userId: string;
};

type ExpenseType = {
  expense: string;
  amount: string;
};


export default function ExpenseCard({label}: FeatureCardType2) {
  const [recExpenseData, setRecExpenseData] = useState<RecExpenseDataItem[]>([]);

  const token = localStorage.getItem("token");
  const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

  const fetchrecExpense = async () => {
      try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/expense/recurring`, config);
          setRecExpenseData(response.data.data);
      } catch (e) {
          console.error(e);
      }
  };

  useEffect(() => {
    fetchrecExpense();
  }, [])
    return <div className="bg-card-color w-full text-white p-6 rounded-lg">
        <div className="font-bold text-lg text-white pl-2">
            {label}
        </div>

        {recExpenseData.map((data) => (
          <ExpenseRow key={data.id} expense={data.category} amount={data.amount.toString()} />
        ))}


    </div>
}
  
  
  function ExpenseRow({ expense, amount }: ExpenseType) {
    return (
      <div className="flex justify-between p-2">
        <div>
            { expense }
        </div>
        <div>
            ${ amount }
        </div>
      </div>
    );
  }
