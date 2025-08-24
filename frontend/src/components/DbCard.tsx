
type DbCardType = {
    label: String
    amount: String
}

export default function DbCard({label, amount}: DbCardType) {
    return <div className="bg-card-color w-64 text-white p-6 rounded-lg">
        <div className="text-sm text-gray-300">
            {label}
        </div>
        <div className="p-4"></div>
        <div className="text-xl font-semibold">
            ${amount}
        </div>
    </div>
}