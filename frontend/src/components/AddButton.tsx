import type { MouseEventHandler } from "react";

type AddButtonType = {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function AddButton({ onClick }: AddButtonType) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 px-4 py-2 h-12 rounded-full bg-my-blue text-white text-sm font-medium 
                   shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add
      </button>
    );
  }