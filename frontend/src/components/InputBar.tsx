import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputBox from "./InputBox";
import AddButton from "./AddButton";
import { SelectWithAdd } from "./SelectWithAddOption";

type Frequency = "daily" | "weekly" | "monthly" | "yearly" | "onetime" | null;

export function useExpense() { 
  const [expenseInput, setExpenseInput] = useState({ date: null as Date | null, category: "", amount: 0 }) 
  
  return { expenseInput, setExpenseInput } 
} 

export function useFrequency() { 
  const [frequency, setFrequency] = useState<Frequency>(null) 
  
  return { frequency, setFrequency } 
}

type InputBarProps = {
  sendRequest1: () => void | Promise<void>; 
  sendRequest2: (frequency: Frequency) => void | Promise<void>;
  expenseInput: {
    date: Date | null;
    category: string;
    amount: number;
  };
  setExpenseInput: React.Dispatch<
    React.SetStateAction<{
      date: Date | null;
      category: string;
      amount: number;
    }>
  >;
};

export function InputBar({
  sendRequest1,
  sendRequest2,
  expenseInput,
  setExpenseInput,
}: InputBarProps) {
  const [recurringType, setRecurringType] = useState<Frequency>(null);

  return (
    <div className="flex pl-4">
      <div className="flex p-10">
        <div>
          <DateInput
            value={expenseInput.date}
            onChange={(date) => setExpenseInput({ ...expenseInput, date })}
          />
        </div>

        <div className="p-10"></div>

        <div>
          <SelectWithAdd
            onChange={(e) => {
              setExpenseInput({
                ...expenseInput,
                category: e.target.value,
              });
            }}
            categorySet={(val: string) => {
              setExpenseInput({
                ...expenseInput,
                category: val,
              });
            }}
          />
        </div>

        <div className="p-10"></div>

        <div>
          <InputBox
            onChange={(e) => {
              setExpenseInput({
                ...expenseInput,
                amount: Number(e.target.value),
              });
            }}
            label={"amount"}
          />
        </div>

        <div className="p-10"></div>

        <div>
          <RecurBox
            label={"Recurring"}
            selected={recurringType}
            setSelected={setRecurringType}
          />
        </div>

        <div className="p-5"></div>

        <div className="flex items-center">
          <AddButton
            onClick={() => {
              console.log("recurringType is:", recurringType);
              if (recurringType && recurringType !== "onetime") {
                sendRequest2(recurringType);
              } else {
                sendRequest1();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

type RecurBoxProps = {
  label: string;
  selected: Frequency;
  setSelected: React.Dispatch<React.SetStateAction<Frequency>>;
};

export const RecurBox = ({ label, setSelected }: RecurBoxProps) => {
  return (
    <div className="pr-2 text-white w-fit">
      <label
        htmlFor="recurring-select"
        className="block mb-2 text-sm font-medium text-white"
      >
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <SelectOpt setSelected={setSelected} />
    </div>
  );
};

type SelectOptProps = {
  setSelected: React.Dispatch<React.SetStateAction<Frequency>>;
};

function SelectOpt({ setSelected }: SelectOptProps) {
  const options = [
    { value: 1, label: "Daily", freq: "daily" },
    { value: 2, label: "Weekly", freq: "weekly" },
    { value: 3, label: "Monthly", freq: "monthly" },
    { value: 4, label: "Yearly", freq: "yearly" },
    { value: 5, label: "One time", freq: "onetime" },
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedOption = options.find((opt) => opt.value === selectedId);
    setSelected(selectedOption ? (selectedOption.freq as Frequency) : null);
  };  

  return (
    <select
      id="recurring-select"
      onChange={handleChange}
      className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <option value="">Choose frequency</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}



type DateInputType = {
    value: Date | null;
    onChange: (date: Date | null) => void;
}

function DateInput({value, onChange}: DateInputType) {

    return (
      <div className="w-full p-5 pt-0">

        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-white"
        >
          Date
        </label>

        <DatePicker
          selected={value}
          onChange={onChange}
          placeholderText="Select date"
          className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-3 py-2 
                     text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 
                     focus:ring-1 focus:ring-blue-500 border-gray-600 bg-gray-700 
                     text-white placeholder-gray-400 focus:border-blue-500 
                     focus:ring-blue-500 placeholder:text-left-align"
        />
      </div>
    );
  }

