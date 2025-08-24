type tableType = {
    data: {
      id: string;
      amount: number;
      category: string;
      date: string;
      userId: string;
    }[];
  };
  
  export default function Table({ data }: tableType) {
    return (
      <div>
        <div className="relative overflow-x-auto p-20 pt-0">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((row) => (
                  <Row
                    key={row.id}
                    category={row.category}
                    date={row.date}
                    amount={row.amount}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center text-white py-4">
                    No expense yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  type rowType = {
    category: string;
    date: string;
    amount: number;
  };
  
  function Row({ category, date, amount }: rowType) {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  
    return (
      <tr className="bg-gray-800 border border-slate-400">
        <th
          scope="row"
          className="px-6 py-4 font-medium whitespace-nowrap text-white"
        >
          {category}
        </th>
        <td className="px-6 py-4 text-white">{formattedDate}</td>
        <td className="px-6 py-4 text-white">${amount}</td>
      </tr>
    );
  }
  