
type tableType = {
    data: { 
        "id": string,
        "amount": number,
        "source": string,
        "date": Date,
        "userId": string
    }[];
}

export default function Table2({ data }: tableType) {

    return <div>
        <div className="relative overflow-x-auto p-10 pt-0">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Source
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map(row => (
                        <Row key={row.id} source={row.source} amount={row.amount} />
                        ))
                    ) : (
                        <tr>
                        <td colSpan={2} className="text-center text-white py-4">
                            No income records found
                        </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
}

type rowType = {
    source: string
    amount: number
}

function Row({ source, amount }: rowType) {
    return <tr className="bg-gray-800 border border-slate-400">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {source}
            </th>
            <td className="px-6 py-4 text-white">
                ${amount}
            </td>
        </tr>
}