import { useState } from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categorySet: (val: string) => void;
};

export function SelectWithAdd({ onChange, categorySet }: Props) {
  const [options, setOptions] = useState(["Food", "Travel", "Shopping"]);

  const handleAdd = () => {
    const newCategory = prompt("Enter new category:");
    if (newCategory && !options.includes(newCategory)) {
      setOptions([...options, newCategory]);
      categorySet(newCategory);
    }
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-white">Category</label>
      <div className="flex gap-2">
        <select
          onChange={onChange}
          className="p-2 rounded bg-gray-700 text-white"
          defaultValue=""
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-600 rounded text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}

