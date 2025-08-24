import { type SetStateAction } from "react";

type SavingDataItem = {
    id: string;
    goal: string;
    target_amt: number;
    saved_amt: number;
    userId: string;
  };

type SelectOptProps = {
    savingData: SavingDataItem[];
    selectId: React.Dispatch<SetStateAction<string>>;
    selectGoal: React.Dispatch<SetStateAction<string>>;
};

export default function SelectOpt({ savingData, selectId, selectGoal }: SelectOptProps) {
    const options = savingData.map((data) => ({
        value: data.id,
        label: data.goal
    }));

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const selectedOption = options.find((opt) => opt.value === selectedId);

        selectId(selectedId);
        selectGoal(selectedOption?.label ?? "");
      };
  
    return (
      <div className="mx-auto p-5 pt-0">
        <label
          htmlFor="goals"
          className="block mb-2 text-sm font-medium text-gray-900 text-white"
        >
          Select a Goal
        </label>
  
        <select
          id="goals"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     bg-gray-700 border-gray-600 placeholder-gray-400 
                     text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose a goal</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }