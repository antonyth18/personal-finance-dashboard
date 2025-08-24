
type FeatureCardType2 = {
    label: String
    savingData: SavingDataItem[];
}

export default function SavingCard({label, savingData}: FeatureCardType2) {
    return <div className="bg-card-color w-full text-white p-6 rounded-lg">
        <div className="font-bold text-lg text-white pl-2">
            {label}
        </div>
        
        <ProgressDisplay savingData={savingData} />
    </div>
}

type ProgressType = {
    headLabel: string;
    percentage: number;
  };
  
  
  export function ProgressBar({ headLabel, percentage }: ProgressType) {
    return (
      <div className="p-2">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-white">{headLabel}</span>
          <span className="text-sm font-medium text-my-blue">
            {percentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-my-blue h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  type SavingDataItem = {
    id: string;
    goal: string;
    target_amt: number;
    saved_amt: number;
    userId: string;
  };

  type progressDisplayType = {
    savingData: SavingDataItem[];
  }

  export function ProgressDisplay({savingData}: progressDisplayType) {

    return <div>
        {savingData.map((data) => {
            const percentage =
          data.target_amt > 0
            ? Math.min((data.saved_amt / data.target_amt) * 100, 100)
            : 0;
            return (
            <ProgressBar
                key={data.id}
                headLabel={data.goal}
                percentage={percentage}
            />
            );
        })}
    </div>
  }
