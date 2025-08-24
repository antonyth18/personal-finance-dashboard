
type FeatureCardType2 = {
    label: String

}

export default function ExpenseCard({label}: FeatureCardType2) {
    return <div className="bg-card-color w-full text-white p-6 rounded-lg">
        <div className="font-bold text-lg text-white pl-2">
            {label}
        </div>
        
        <ExpenseRow expense={"Rent"} amount={"7,000"}/>
        <ExpenseRow expense={"Subscriptions"} amount={"400"}/>
    </div>
}

type ExpenseType = {
    expense: string;
    amount: string;
  };
  
  
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
