export default function LegendChartItem({ label, color }) {
    return (
        <div className="flex gap-1.5 items-center">
            <span
                style={{ background: color }}
                className="h-4 w-4 rounded-full"
            />
            <span className="text-xs">{label}</span>
        </div>
    )
}
