
type FeatureCardType = {
    label: String
    graph: React.ComponentType
}

export default function FeatureCard({label, graph: Graph}: FeatureCardType) {
    return <div className="bg-card-color h-80 w-full text-white p-6 rounded-lg">
        <div className="font-bold text-lg text-white pl-2">
            {label}
        </div>
        <div className="flex justify-center items-center">
            <Graph />
        </div>
    </div>
}