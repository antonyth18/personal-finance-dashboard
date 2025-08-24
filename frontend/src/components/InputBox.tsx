import type { ChangeEvent } from "react";


type InputBoxType = {
    label: String
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({ label, onChange }: InputBoxType) {
  
    return (
      <div className="mb-6 w-full p-5 pb-0 pt-0">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-white"
        >
            {label.charAt(0).toUpperCase()}{label.slice(1)}
        </label>
        <input
          type="text"
          id="default-input"
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     bg-gray-700 border-gray-600 placeholder-gray-400 
                     text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder= {`Enter ${label}`}
        />
      </div>
    );

  }