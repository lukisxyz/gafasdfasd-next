export default function SummaryCard(props) {
    const { color, icon, label, value } = props
    return (
        <div
            style={{ background: color + '33' }}
            className="p-5 rounded-lg items-center w-full flex justify-between max-w-xl">
            <div
                style={{ background: color + '33' }}
                className="h-[54px] w-[54px] flex justify-center items-center rounded-lg">
                {icon}
            </div>
            <div className="text-right">
                <span className="text-[33px] font-medium">{value}</span>
                <p className="text-base font-normal" style={{ color }}>
                    {label}
                </p>
            </div>
        </div>
    )
}
